import { useSelector } from "react-redux";
import type { RootState } from "../reducer/store";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-2xl">
          Your cart is empty.
        </div>
      ) : (
        <div className="text-center text-gray-900">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        </div>
      )}
      {cartItems.map((item) => (
        <div key={item.id}>
          {item.name} - {item.quantity} x {item.price}€
        </div>
      ))}
    </div>
  );
}
