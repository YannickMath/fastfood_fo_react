import { addItem, clearCart } from "../redux/reducers/cartSlice";
import type { AppDispatch } from "../redux/store";
import { cartApi } from "../services/cart";
import type { CartItem } from "../types/cartItem";

export default async function SyncCart(dispatch: AppDispatch) {
  try {
    // Récupère le panier du backend
    const result = await dispatch(
      cartApi.endpoints.getCartItems.initiate()
    ).unwrap();
    const backendCartItems: CartItem[] = result.items;
    console.log("Backend cart items:", backendCartItems);
    console.log("on passe par SyncCart");

    // Récupère les items sessionStorage
    const sessionRaw = sessionStorage.getItem("cart");
    const sessionCartItems: CartItem[] = sessionRaw
      ? JSON.parse(sessionRaw)
      : [];

    // Fusion uniquement si session non vide
    const mergedCart: CartItem[] = [...backendCartItems];
    sessionCartItems.forEach((itemFromSession) => {
      const found = mergedCart.find(
        (i) => i.productId === itemFromSession.productId
      );
      if (found) {
        found.quantity += itemFromSession.quantity;
      } else {
        mergedCart.push(itemFromSession);
      }
    });

    if (sessionCartItems.length > 0) {
      // On envoie la fusion au backend
      await dispatch(cartApi.endpoints.syncCart.initiate(mergedCart)).unwrap();
      sessionStorage.removeItem("cart");
    }

    // Met à jour Redux avec le panier final
    dispatch(clearCart());
    mergedCart.forEach((item) => dispatch(addItem(item)));
  } catch (err) {
    console.error("Cart sync error:", err);
  }
}
