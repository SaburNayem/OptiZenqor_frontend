import { resolveWithLatency } from "../../../services/serviceUtils";

export async function placeOrder(payload) {
  return resolveWithLatency({
    orderId: `MOCK-${Date.now()}`,
    payload,
  }, 180);
}
