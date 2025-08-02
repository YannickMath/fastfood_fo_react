import type { CartItem } from "../types/cartItem";
import type { AppDispatch } from "../redux/store";
import { cartApi } from "../services/cart";
import { removeOneItem } from "../redux/reducers/cartSlice";
import type { RawProduct } from "../types/rawProduct";
import normalizeToCartItem from "./normalizeToCartItem";

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
    return updatedCart;
  }
}
