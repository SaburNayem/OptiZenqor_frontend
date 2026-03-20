import { accountActions, accountProfile } from "../data/mockStorefront";
import { resolveWithLatency } from "./serviceUtils";

export async function getAccountOverview() {
  return resolveWithLatency({
    profile: accountProfile,
    actions: accountActions,
  });
}
