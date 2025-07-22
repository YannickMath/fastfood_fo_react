import type { CartItem } from "../types/cartItem";
import type { AppDispatch } from "../redux/store";
import { cartApi } from "../services/cart";
import type { Product } from "../types/product";

export default async function handleAddToCart(
  product: Product,
  isAuthenticated: boolean,
  dispatch: AppDispatch
) {
  if (isAuthenticated) {
    await dispatch(
      cartApi.endpoints.addCartItem.initiate({
        productId: product.id,
        quantity: 1,
      })
    ).unwrap();
  } else {
    const existingCart = sessionStorage.getItem("cart");

    let cartItems: CartItem[] = [];
    try {
      const parsed = existingCart ? JSON.parse(existingCart) : [];
      cartItems = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      cartItems = [];
    }

    const productExists = cartItems.find(
      (item) => item.productId === product.id
    );
    console.log("Product exists:", productExists);

    const updatedCart = productExists
      ? cartItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, { ...product, quantity: 1 }];

    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  }
}
