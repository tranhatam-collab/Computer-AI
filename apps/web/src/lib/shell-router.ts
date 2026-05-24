import type { ProductId } from "@iai/product-registry";
import { products } from "@iai/product-registry";

export type PageRoute =
  | { type: "home" }
  | { type: "product"; id: ProductId }
  | { type: "compare" }
  | { type: "pricing" };

export function resolveRoute(path: string): PageRoute {
  if (path === "/" || path === "") return { type: "home" };
  if (path === "/compare") return { type: "compare" };
  if (path === "/pricing") return { type: "pricing" };
  const match = path.match(/^\/product\/([a-z-]+)/);
  if (match) {
    const id = match[1] as ProductId;
    const found = products.find((p) => p.id === id);
    if (found) return { type: "product", id };
  }
  return { type: "home" };
}

export function getProductPath(id: string): string {
  return `/product/${id}`;
}
