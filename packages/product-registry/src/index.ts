export type { ProductId, Tier, LaneId, RuntimeClass, EntitlementKey } from "./types.js";
export type { ProductDef } from "./products.js";
export type { ProductShell } from "./shell.js";
export type { PriceEntry } from "./pricing.js";
export type { AppMapEntry } from "./app-map.js";

export { products } from "./products.js";
export { getShell, getAllShells } from "./shell.js";
export { getEntitlements } from "./entitlement.js";
export { getPricing, getVndPrice, getUsdPrice } from "./pricing.js";
export { getAppMap, getAppMapByLane, getProductsByLane } from "./app-map.js";

import { products } from "./products.js";
import type { ProductId } from "./types.js";
export function getProduct(id: ProductId) {
  return products.find((p) => p.id === id);
}
