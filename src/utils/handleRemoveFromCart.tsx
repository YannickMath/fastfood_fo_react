import type { CartItem } from "../types/cartItem";
import type { AppDispatch } from "../redux/store";
import { cartApi } from "../services/cart";

export default async function handleRemoveFromCart(
  product: CartItem,
  isAuthenticated: boolean,
  dispatch: AppDispatch
) {
  if (isAuthenticated) {
    await dispatch(
      cartApi.endpoints.removeCartItem.initiate(product.productId)
    ).unwrap();
  } else {
    const existingCart = sessionStorage.getItem("cart");
    let cartItems: CartItem[] = [];

    try {
      const parsed = existingCart ? JSON.parse(existingCart) : [];
      cartItems = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return;
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
