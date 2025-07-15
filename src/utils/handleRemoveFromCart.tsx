import { removeOneItem } from "../reducer/slices/cartSlice";
import type { AppDispatch } from "../reducer/store";

type CartItem = {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
};

type Product = {
  id: number;
  name: string;
  description: string;
  image?: string;
  price: number;
};

export default function handleRemoveFromCart(
  product: Product,
  isAuthenticated: boolean,
  dispatch: AppDispatch
) {
  const { id } = product;

  if (isAuthenticated) {
    dispatch(removeOneItem(id));
  } else {
    const existingCart = sessionStorage.getItem("cart");
    let cartItems: CartItem[] = [];

    try {
      const parsed = existingCart ? JSON.parse(existingCart) : [];
      cartItems = Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      console.error("Erreur parsing cart:", error);
      return;
    }

    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  }
}
