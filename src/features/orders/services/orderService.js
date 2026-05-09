import { apiRequest } from "../../../services/apiClient";

function normalizeAddress(address) {
  if (!address) return null;

  return {
    id: address.id || address.label || "address",
    label: address.label || "Address",
    name: address.fullName,
    phone: address.phone,
    line1: address.addressLine1,
    line2: address.addressLine2 || "",
    city: address.city,
    region: address.area,
    country: address.country,
    postalCode: address.postalCode || "",
    primary: Boolean(address.isDefault),
  };
}

export function mapOrder(order) {
  return {
    id: order.id,
    number: order.orderNumber,
    status: order.status,
    placedAt: new Date(order.createdAt).toLocaleDateString(),
    estimatedDelivery: order.status === "DELIVERED" ? "Delivered" : "Tracking available from support",
    items: (order.items || []).map((item) => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.productId,
        name: item.productName,
        imageUrl:
          item.productImage ||
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        shortDescription: item.productName,
        price: Number(item.unitPrice || 0),
      },
    })),
    shippingAddress: normalizeAddress(order.shippingAddressSnapshot),
    paymentMethod: order.paymentStatus,
    timeline: [
      "Order placed",
      ...(order.status === "PAID" || order.status === "PACKED" || order.status === "SHIPPED" || order.status === "DELIVERED" ? ["Payment confirmed"] : []),
      ...(order.status === "PACKED" || order.status === "SHIPPED" || order.status === "DELIVERED" ? ["Preparing shipment"] : []),
      ...(order.status === "SHIPPED" || order.status === "DELIVERED" ? ["Shipped"] : []),
      ...(order.status === "DELIVERED" ? ["Delivered"] : []),
    ],
    subtotal: Number(order.subtotal || 0),
    shippingFee: Number(order.deliveryFee || 0),
    total: Number(order.total || 0),
  };
}

export async function getMyOrders() {
  const orders = await apiRequest("/orders/my");
  return orders.map(mapOrder);
}

export async function getOrderById(orderId) {
  const order = await apiRequest(`/orders/${orderId}`);
  return mapOrder(order);
}
