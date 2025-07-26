import type { CartItem } from "../types/cartItem";
import type { AppDispatch } from "../redux/store";
import { cartApi } from "../services/cart";
import { addItem } from "../redux/reducers/cartSlice";

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

export default async function handleAddToCart(
  rawProduct: RawProduct,
  isAuthenticated: boolean,
  dispatch: AppDispatch
) {
  const product = normalizeToCartItem(rawProduct);

  if (isAuthenticated) {
    await dispatch(
      cartApi.endpoints.addCartItem.initiate({
        productId: product.productId,
        quantity: 1,
      })
    ).unwrap();

    dispatch(addItem(product));
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
      (item) => item.productId === product.productId
    );

    const updatedCart = productExists
      ? cartItems.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, product];

    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  }
}
