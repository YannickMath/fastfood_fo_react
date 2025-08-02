import type { CartItem } from "../types/cartItem";
import type { RawProduct } from "../types/rawProduct";

export default function normalizeToCartItem(product: RawProduct): CartItem {
  return {
    id: product.id ?? product.productId ?? 0,
    productId: product.productId ?? product.id,
    productName: product.productName ?? product.name ?? "Unknown",
    productPrice: product.productPrice ?? product.price ?? 0,
    quantity: product.quantity ?? 1,
  };
}
