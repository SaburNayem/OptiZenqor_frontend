import { resolveWithLatency } from "../../../services/serviceUtils";

export async function signIn(payload) {
  return resolveWithLatency({
    user: {
      name: "Returning Customer",
      email: payload.email,
    },
  });
}

export async function signUp(payload) {
  return resolveWithLatency({
    user: {
      name: payload.name,
      email: payload.email,
    },
  });
}
