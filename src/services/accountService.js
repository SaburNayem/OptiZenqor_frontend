import { accountActions } from "../data/mockStorefront";
import { apiRequest } from "./apiClient";
import { getMyOrders } from "../features/orders/services/orderService";

function mapAddress(address) {
  return {
    id: address.id,
    label: address.label,
    line1: address.addressLine1,
    city: address.city,
    country: address.country,
    primary: Boolean(address.isDefault),
  };
}

export async function getAccountOverview() {
  const [profile, addresses, orders] = await Promise.all([
    apiRequest("/users/me"),
    apiRequest("/users/me/addresses"),
    getMyOrders(),
  ]);

  return {
    profile: {
      name: profile.fullName,
      email: profile.email,
      avatarUrl: profile.avatarUrl || "https://i.pravatar.cc/200?img=32",
      loyaltyTier: profile.role,
      memberSince: new Date(profile.createdAt).getFullYear(),
    },
    actions: accountActions,
    addresses: addresses.map(mapAddress),
    notifications: orders.slice(0, 3).map((order) => ({
      id: order.id,
      title: `${order.number} is currently ${order.status.toLowerCase()}`,
      time: order.placedAt,
    })),
    paymentMethods: [
      { id: "pm_backend", label: "Payment status from backend orders", expires: "Managed at checkout" },
    ],
    orders,
    settings: {
      pushNotifications: true,
      emailUpdates: true,
      smsAlerts: false,
      privateProfile: false,
      biometricLogin: true,
      savePaymentInformation: false,
      appLanguage: "English",
      productTranslation: "Auto",
      currency: "BDT",
      deliveryPreference: "Primary address",
      searchHistory: true,
    },
    supportTickets: [],
  };
}
