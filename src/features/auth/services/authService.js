import { apiRequest } from "../../../services/apiClient";

const SESSION_KEY = "optizenqor_frontend_session";

export async function signIn(payload) {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(result));
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

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(result));
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
