"""
Профиль пользователя: получение, обновление, настройки уведомлений и приватности.
?action=get           — получить профиль (GET)
?action=update        — обновить профиль (PUT)
?action=notifications — настройки уведомлений (GET/PUT)
?action=privacy       — настройки приватности (GET/PUT)
?action=users         — список пользователей для CRM (GET, только admin)
"""
import json
import os
import psycopg2


CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
}


def ok(data: dict) -> dict:
    return {"statusCode": 200, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(data, ensure_ascii=False, default=str)}


def err(msg: str, status: int = 400) -> dict:
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps({"error": msg}, ensure_ascii=False)}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def get_user_by_token(cur, token: str):
    if not token:
        return None
    cur.execute(
        "SELECT u.id, u.name, u.email, u.city, u.child_name, u.child_age, u.about, u.is_admin "
        "FROM sessions s JOIN users u ON s.user_id = u.id "
        "WHERE s.token = %s AND s.expires_at > NOW()",
        (token,)
    )
    row = cur.fetchone()
    if not row:
        return None
    return {"id": str(row[0]), "name": row[1], "email": row[2], "city": row[3] or "",
            "childName": row[4] or "", "childAge": row[5] or "", "about": row[6] or "", "isAdmin": row[7]}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    action = params.get("action", "get")
    token = event.get("headers", {}).get("X-Auth-Token", "")

    conn = get_conn()
    cur = conn.cursor()

    try:
        user = get_user_by_token(cur, token)
        if not user:
            return err("Нет авторизации", 401)

        user_id = user["id"]

        # ── notifications ──
        if action == "notifications":
            if method == "GET":
                cur.execute(
                    "SELECT new_posts, replies, likes, consultations, stories, new_members, weekly_digest, promo "
                    "FROM notification_settings WHERE user_id = %s", (user_id,)
                )
                row = cur.fetchone()
                if not row:
                    return ok({"newPosts": True, "replies": True, "likes": False, "consultations": True,
                               "stories": False, "newMembers": False, "weeklyDigest": True, "promo": False})
                return ok({"newPosts": row[0], "replies": row[1], "likes": row[2], "consultations": row[3],
                           "stories": row[4], "newMembers": row[5], "weeklyDigest": row[6], "promo": row[7]})

            body = json.loads(event.get("body") or "{}")
            cur.execute(
                "INSERT INTO notification_settings (user_id, new_posts, replies, likes, consultations, stories, new_members, weekly_digest, promo) "
                "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) "
                "ON CONFLICT (user_id) DO UPDATE SET new_posts=EXCLUDED.new_posts, replies=EXCLUDED.replies, likes=EXCLUDED.likes, "
                "consultations=EXCLUDED.consultations, stories=EXCLUDED.stories, new_members=EXCLUDED.new_members, "
                "weekly_digest=EXCLUDED.weekly_digest, promo=EXCLUDED.promo",
                (user_id, body.get("newPosts", True), body.get("replies", True), body.get("likes", False),
                 body.get("consultations", True), body.get("stories", False), body.get("newMembers", False),
                 body.get("weeklyDigest", True), body.get("promo", False))
            )
            conn.commit()
            return ok({"ok": True})

        # ── privacy ──
        if action == "privacy":
            if method == "GET":
                cur.execute(
                    "SELECT public_profile, show_city, show_child, allow_messages, show_online, index_search "
                    "FROM privacy_settings WHERE user_id = %s", (user_id,)
                )
                row = cur.fetchone()
                if not row:
                    return ok({"publicProfile": True, "showCity": True, "showChild": True,
                               "allowMessages": True, "showOnline": False, "indexSearch": True})
                return ok({"publicProfile": row[0], "showCity": row[1], "showChild": row[2],
                           "allowMessages": row[3], "showOnline": row[4], "indexSearch": row[5]})

            body = json.loads(event.get("body") or "{}")
            cur.execute(
                "INSERT INTO privacy_settings (user_id, public_profile, show_city, show_child, allow_messages, show_online, index_search) "
                "VALUES (%s,%s,%s,%s,%s,%s,%s) "
                "ON CONFLICT (user_id) DO UPDATE SET public_profile=EXCLUDED.public_profile, show_city=EXCLUDED.show_city, "
                "show_child=EXCLUDED.show_child, allow_messages=EXCLUDED.allow_messages, "
                "show_online=EXCLUDED.show_online, index_search=EXCLUDED.index_search",
                (user_id, body.get("publicProfile", True), body.get("showCity", True), body.get("showChild", True),
                 body.get("allowMessages", True), body.get("showOnline", False), body.get("indexSearch", True))
            )
            conn.commit()
            return ok({"ok": True})

        # ── users (CRM, admin only) ──
        if action == "users":
            if not user["isAdmin"]:
                return err("Доступ запрещён", 403)
            cur.execute(
                "SELECT id, name, email, city, child_age, is_admin, created_at, "
                "(SELECT COUNT(*) FROM sessions WHERE user_id = users.id AND expires_at > NOW()) as active_sessions "
                "FROM users ORDER BY created_at DESC"
            )
            rows = cur.fetchall()
            users = [{"id": str(r[0]), "name": r[1], "email": r[2], "city": r[3] or "",
                      "childAge": r[4] or "", "isAdmin": r[5], "createdAt": str(r[6]),
                      "activeSessions": r[7]} for r in rows]
            return ok({"users": users})

        # ── update profile ──
        if action == "update":
            body = json.loads(event.get("body") or "{}")
            name = (body.get("name") or "").strip() or user["name"]
            city = (body.get("city") or "").strip()
            child_name = (body.get("childName") or "").strip()
            child_age = (body.get("childAge") or "").strip()
            about = (body.get("about") or "").strip()

            cur.execute(
                "UPDATE users SET name=%s, city=%s, child_name=%s, child_age=%s, about=%s, updated_at=NOW() WHERE id=%s",
                (name, city, child_name, child_age, about, user_id)
            )
            conn.commit()
            return ok({"user": {**user, "name": name, "city": city,
                                "childName": child_name, "childAge": child_age, "about": about}})

        # ── get profile ──
        return ok({"user": user})

    finally:
        cur.close()
        conn.close()
