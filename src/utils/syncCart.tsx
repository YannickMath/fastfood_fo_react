import { addItem, clearCart } from "../redux/reducers/cartSlice";
import type { AppDispatch } from "../redux/store";
import { cartApi } from "../services/cart";
import type { CartItem } from "../types/cartItem";

export default async function SyncCart(dispatch: AppDispatch) {
  const existingCart = sessionStorage.getItem("cart");

  if (existingCart) {
    try {
      const sessionCartItems: CartItem[] = JSON.parse(existingCart);

      // 1. Récupérer le panier du backend
      const result = await dispatch(
        cartApi.endpoints.getCartItems.initiate()
      ).unwrap();
      const backendCartItems: CartItem[] = result.items;

      // 2. Fusionner les deux paniers
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

      // 3. Envoyer les données fusionnées à l’API
      await dispatch(cartApi.endpoints.syncCart.initiate(mergedCart)).unwrap();

      // ✅ 4. Mettre à jour Redux avec le panier fusionné
      dispatch(clearCart()); // vide d'abord l'ancien Redux state
      mergedCart.forEach((item) => dispatch(addItem(item)));

      // 5. Nettoyer sessionStorage
      sessionStorage.removeItem("cart");
    } catch (err) {
      console.error("Cart sync error:", err);
    }
  }
}
