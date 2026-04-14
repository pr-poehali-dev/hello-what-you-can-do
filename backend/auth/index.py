"""
Аутентификация: регистрация, вход, выход, проверка сессии.
?action=register — создать аккаунт (POST)
?action=login    — войти (POST)
?action=logout   — выйти (POST)
?action=me       — получить текущего пользователя (GET)
"""
import json
import os
import hashlib
import secrets
import psycopg2


CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
}


def ok(data: dict, status: int = 200) -> dict:
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(data, ensure_ascii=False)}


def err(msg: str, status: int = 400) -> dict:
    return {"statusCode": status, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps({"error": msg}, ensure_ascii=False)}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(password: str) -> str:
    return hashlib.md5(password.encode()).hexdigest()


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    action = params.get("action", "me")

    conn = get_conn()
    cur = conn.cursor()

    try:
        # ── me ──
        if action == "me":
            token = event.get("headers", {}).get("X-Auth-Token", "")
            if not token:
                return err("Нет токена", 401)
            cur.execute(
                "SELECT u.id, u.name, u.email, u.city, u.child_name, u.child_age, u.about, u.is_admin "
                "FROM sessions s JOIN users u ON s.user_id = u.id "
                "WHERE s.token = %s AND s.expires_at > NOW()",
                (token,)
            )
            row = cur.fetchone()
            if not row:
                return err("Сессия не найдена", 401)
            return ok({"user": {
                "id": str(row[0]), "name": row[1], "email": row[2],
                "city": row[3] or "", "childName": row[4] or "", "childAge": row[5] or "",
                "about": row[6] or "", "isAdmin": row[7]
            }})

        body = json.loads(event.get("body") or "{}")

        # ── register ──
        if action == "register":
            name = (body.get("name") or "").strip()
            email = (body.get("email") or "").strip().lower()
            password = body.get("password") or ""
            city = (body.get("city") or "").strip()
            child_age = (body.get("childAge") or "").strip()

            if not name or not email or not password:
                return err("Имя, email и пароль обязательны")
            if len(password) < 6:
                return err("Пароль должен быть не менее 6 символов")

            cur.execute("SELECT id FROM users WHERE email = %s", (email,))
            if cur.fetchone():
                return err("Этот email уже зарегистрирован")

            pw_hash = hash_password(password)
            cur.execute(
                "INSERT INTO users (name, email, password_hash, city, child_age) VALUES (%s,%s,%s,%s,%s) RETURNING id",
                (name, email, pw_hash, city, child_age)
            )
            user_id = str(cur.fetchone()[0])
            cur.execute("INSERT INTO notification_settings (user_id) VALUES (%s)", (user_id,))
            cur.execute("INSERT INTO privacy_settings (user_id) VALUES (%s)", (user_id,))

            token = secrets.token_hex(32)
            cur.execute("INSERT INTO sessions (user_id, token) VALUES (%s,%s)", (user_id, token))
            conn.commit()
            return ok({"token": token, "user": {
                "id": user_id, "name": name, "email": email,
                "city": city, "childAge": child_age, "childName": "", "about": "", "isAdmin": False
            }}, 201)

        # ── login ──
        if action == "login":
            email = (body.get("email") or "").strip().lower()
            password = body.get("password") or ""
            if not email or not password:
                return err("Email и пароль обязательны")

            pw_hash = hash_password(password)
            cur.execute(
                "SELECT id, name, email, city, child_name, child_age, about, is_admin "
                "FROM users WHERE email = %s AND password_hash = %s",
                (email, pw_hash)
            )
            row = cur.fetchone()
            if not row:
                return err("Неверный email или пароль", 401)

            token = secrets.token_hex(32)
            cur.execute("INSERT INTO sessions (user_id, token) VALUES (%s,%s)", (str(row[0]), token))
            conn.commit()
            return ok({"token": token, "user": {
                "id": str(row[0]), "name": row[1], "email": row[2],
                "city": row[3] or "", "childName": row[4] or "", "childAge": row[5] or "",
                "about": row[6] or "", "isAdmin": row[7]
            }})

        # ── logout ──
        if action == "logout":
            token = event.get("headers", {}).get("X-Auth-Token", "")
            if token:
                cur.execute("UPDATE sessions SET expires_at = NOW() WHERE token = %s", (token,))
                conn.commit()
            return ok({"ok": True})

        return err("Неизвестное действие", 404)

    finally:
        cur.close()
        conn.close()
