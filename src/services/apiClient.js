const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000").replace(/\/+$/, "");
const SESSION_KEY = "optizenqor_frontend_session";

export function unwrapResponse(payload) {
  return payload?.data ?? payload;
}

export function getStoredSession() {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getAccessToken() {
  return getStoredSession()?.tokens?.accessToken || "";
}

export function setStoredSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

export async function apiRequest(path, options = {}) {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = Array.isArray(json?.message) ? json.message.join(", ") : json?.message || json?.error;
    throw new Error(message || `Request failed for ${path}`);
  }

  return unwrapResponse(json);
}
