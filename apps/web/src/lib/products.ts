import { products as registryProducts } from "@iai/product-registry";

// Re-export registry products as the source of truth
export const products = registryProducts;

export type { ProductDef } from "@iai/product-registry";
