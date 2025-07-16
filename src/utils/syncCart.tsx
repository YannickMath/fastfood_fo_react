import { addItem } from "../redux/reducers/cartSlice";
import type { AppDispatch } from "../redux/store";

export default function SyncCart(dispatch: AppDispatch) {
  const existingCart = sessionStorage.getItem("cart");
  if (existingCart) {
    try {
      const cartItems = JSON.parse(existingCart);
      if (Array.isArray(cartItems)) {
        cartItems.forEach((item) => {
          dispatch(addItem({ ...item, id: Number(item.id) }));
        });
        sessionStorage.removeItem("cart");
      }
    } catch (err) {
      console.error("Guest cart migration error... :", err);
    }
  }
}
