import type { CartItem } from "./cartItem";

export interface CartState {
  items: CartItem[];
  total: number;
}
