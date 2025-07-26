import { addItem, clearCart } from "../redux/reducers/cartSlice";
import type { AppDispatch } from "../redux/store";
import { cartApi } from "../services/cart";
import type { CartItem } from "../types/cartItem";

export default async function SyncCart(dispatch: AppDispatch) {
  try {
    const sessionRaw = sessionStorage.getItem("cart");
    const sessionCartItems: CartItem[] = sessionRaw
      ? JSON.parse(sessionRaw)
      : [];

    if (sessionCartItems.length > 0) {
      await dispatch(
        cartApi.endpoints.mergeCart.initiate({ items: sessionCartItems })
      ).unwrap();
      sessionStorage.removeItem("cart");
    }

    // Re-fetch the updated cart from backend
    const finalCart = await dispatch(
      cartApi.endpoints.getCartItems.initiate(undefined, { forceRefetch: true })
    ).unwrap();

    dispatch(clearCart());
    finalCart.items.forEach((item: CartItem) => dispatch(addItem(item)));
  } catch (err) {
    console.error("Cart sync error:", err);
  }
}
