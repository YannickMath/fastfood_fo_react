import type { CartItem } from "../types/cartItem";
import type { AppDispatch } from "../redux/store";
import { cartApi } from "../services/cart";
import { removeOneItem } from "../redux/reducers/cartSlice";

interface RawProduct {
  id: number;
  name?: string;
  price?: number;
  productId?: number;
  productName?: string;
  productPrice?: number;
  quantity?: number;
}

function normalizeToCartItem(product: RawProduct): CartItem {
  return {
    id: product.id ?? product.productId ?? 0,
    productId: product.productId ?? product.id,
    productName: product.productName ?? product.name ?? "Unknown",
    productPrice: product.productPrice ?? product.price ?? 0,
    quantity: product.quantity ?? 1,
  };
}

export default async function handleRemoveFromCart(
  rawProduct: RawProduct,
  isAuthenticated: boolean,
  dispatch: AppDispatch
) {
  const product = normalizeToCartItem(rawProduct);

  if (typeof product.productId !== "number") {
    throw new Error("productId is required and must be a number.");
  }

  if (isAuthenticated) {
    await dispatch(
      cartApi.endpoints.updateCartItemQuantity.initiate({
        productId: product.productId,
      })
    ).unwrap();

    dispatch(removeOneItem(product.productId));
  } else {
    const existingCart = sessionStorage.getItem("cart");
    let cartItems: CartItem[] = [];

    try {
      const parsed = existingCart ? JSON.parse(existingCart) : [];
      cartItems = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      cartItems = [];
    }

    const updatedCart = cartItems
      .map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  }
}
