import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { showPopup } from "../redux/reducers/popupSlice";
import Loader from "../components/loader";
import { useEffect, useState } from "react";
import { clearCart, type CartItem } from "../redux/reducers/cartSlice";
import handleRemoveFromCart from "../utils/handleRemoveFromCart";
import handleAddToCart from "../utils/handleAddToCart";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const cartItemsFromStore = useSelector(
    (state: RootState) => state.cart.items
  );

  const [guestCartItems, setGuestCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(true);
      try {
        const stored = sessionStorage.getItem("cart");
        const parsed = stored ? JSON.parse(stored) : [];
        const items = Array.isArray(parsed) ? parsed : [parsed];
        setGuestCartItems(items);
      } catch {
        setGuestCartItems([]);
      } finally {
        setTimeout(() => setLoading(false));
      }
    }
  }, [isAuthenticated]);

  const itemsToDisplay = isAuthenticated ? cartItemsFromStore : guestCartItems;

  const handleShowPopup = (message: string) => {
    dispatch(showPopup(message));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      {loading ? (
        <Loader size="xl" message="Loading cart items..." />
      ) : itemsToDisplay.length < 1 ? (
        <div className="text-center text-gray-500 text-2xl">
          Your cart is empty.
        </div>
      ) : (
        <div className="text-center text-gray-900">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Items:</h2>
            <ul className="list-disc list-inside">
              {itemsToDisplay.map((product) => (
                <li key={product.id}>
                  {product.name} - {product.quantity} x {product.price}€
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleAddToCart(product, isAuthenticated, dispatch)
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        handleRemoveFromCart(product, isAuthenticated, dispatch)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                    >
                      -
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={() => {
            if (!isAuthenticated) {
              handleShowPopup("Please log in to proceed.");
            } else {
              navigate("/checkout");
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Proceed to Checkout
        </button>
        <button
          onClick={() => {
            if (isAuthenticated) {
              dispatch(clearCart());
            } else {
              sessionStorage.removeItem("cart");
              setGuestCartItems([]);
            }
            handleShowPopup("Cart cleared successfully.");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer ml-4"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
