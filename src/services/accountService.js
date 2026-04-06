import {
  accountActions,
  addresses,
  notifications,
  orders,
  paymentMethods,
  settings,
  supportTickets,
  userProfile,
} from "../data/mockStorefront";
import { resolveWithLatency } from "./serviceUtils";

export async function getAccountOverview() {
  return resolveWithLatency({
    profile: userProfile,
    actions: accountActions,
    addresses,
    notifications,
    paymentMethods,
    orders,
    settings,
    supportTickets,
  });
}
