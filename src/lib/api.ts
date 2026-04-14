const AUTH_URL = "https://functions.poehali.dev/e12e20f7-2a2c-4c32-a928-e19109d00e8b";
const PROFILE_URL = "https://functions.poehali.dev/f2bb1af5-d3db-4bea-8182-ef3849310865";

const TOKEN_KEY = "mamaclub_token";

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
  return { "Content-Type": "application/json", "X-Auth-Token": getToken() };
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  city: string;
  childName: string;
  childAge: string;
  about: string;
  isAdmin: boolean;
}

// ── Auth ──

export async function apiRegister(data: {
  name: string; email: string; password: string; city?: string; childAge?: string;
}): Promise<{ token: string; user: ApiUser }> {
  const res = await fetch(`${AUTH_URL}?action=register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Ошибка регистрации");
  setToken(json.token);
  return json;
}

export async function apiLogin(email: string, password: string): Promise<{ token: string; user: ApiUser }> {
  const res = await fetch(`${AUTH_URL}?action=login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Ошибка входа");
  setToken(json.token);
  return json;
}

export async function apiLogout() {
  await fetch(`${AUTH_URL}?action=logout`, {
    method: "POST",
    headers: authHeaders(),
  });
  clearToken();
}

export async function apiMe(): Promise<ApiUser | null> {
  const token = getToken();
  if (!token) return null;
  const res = await fetch(`${AUTH_URL}?action=me`, { headers: authHeaders() });
  if (!res.ok) { clearToken(); return null; }
  const json = await res.json();
  return json.user;
}

// ── Profile ──

export async function apiGetProfile(): Promise<ApiUser> {
  const res = await fetch(`${PROFILE_URL}?action=get`, { headers: authHeaders() });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json.user;
}

export async function apiUpdateProfile(data: Partial<ApiUser>): Promise<ApiUser> {
  const res = await fetch(`${PROFILE_URL}?action=update`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json.user;
}

// ── Notifications ──

export async function apiGetNotifications() {
  const res = await fetch(`${PROFILE_URL}?action=notifications`, { headers: authHeaders() });
  return res.json();
}

export async function apiSaveNotifications(data: Record<string, boolean>) {
  await fetch(`${PROFILE_URL}?action=notifications`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

// ── Privacy ──

export async function apiGetPrivacy() {
  const res = await fetch(`${PROFILE_URL}?action=privacy`, { headers: authHeaders() });
  return res.json();
}

export async function apiSavePrivacy(data: Record<string, boolean>) {
  await fetch(`${PROFILE_URL}?action=privacy`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

// ── CRM users ──

export async function apiGetUsers() {
  const res = await fetch(`${PROFILE_URL}?action=users`, { headers: authHeaders() });
  const json = await res.json();
  return json.users || [];
}
