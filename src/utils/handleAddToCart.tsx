import { addItem, type CartItem } from "../redux/reducers/cartSlice";
import type { AppDispatch } from "../redux/store";
import type { Product } from "../types/product";

export default function handleAddToCart(
  product: Product,
  isAuthenticated: boolean,
  dispatch: AppDispatch
) {
  const { id, name, price } = product;

  if (isAuthenticated) {
    dispatch(addItem({ id, name, price, quantity: 1 }));
  } else {
    const existingCart = sessionStorage.getItem("cart");

    let cartItems: CartItem[] = [];

    try {
      const parsed = existingCart ? JSON.parse(existingCart) : [];
      cartItems = Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      console.error("Error parsing cart:", error);
      cartItems = [];
    }

    const productExists = cartItems.find((item) => item.id === id);

    const updatedCart = productExists
      ? cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...cartItems, { id, name, price, quantity: 1 }];

    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  }
}
