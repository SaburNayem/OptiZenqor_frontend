import { apiRequest, clearStoredSession, setStoredSession } from "../../../services/apiClient";

export async function signIn(payload) {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });

  setStoredSession(result);
  return result;
}

export async function signUp(payload) {
  const result = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      fullName: payload.name,
      email: payload.email,
      phone: payload.phone || "+8801700000000",
      password: payload.password,
    }),
  });

  setStoredSession(result);
  return result;
}

export async function forgotPassword(email) {
  return apiRequest("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function verifyResetCode(email, code) {
  return apiRequest("/auth/verify-reset-code", {
    method: "POST",
    body: JSON.stringify({ email, code }),
  });
}

export async function resetPassword(email, code, newPassword) {
  return apiRequest("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email, code, newPassword }),
  });
}

export function signOut() {
  clearStoredSession();
}
