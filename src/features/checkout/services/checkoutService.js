import { apiRequest } from "../../../services/apiClient";
import { mapOrder } from "../../orders/services/orderService";

export async function placeOrder(payload) {
  const order = await apiRequest("/orders/checkout", {
    method: "POST",
    body: JSON.stringify({
      addressId: payload.addressId,
      deliveryFee: payload.deliveryFee,
      notes: payload.notes,
      currency: "BDT",
    }),
  });

  return mapOrder(order);
}
