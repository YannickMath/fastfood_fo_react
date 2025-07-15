import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../reducer/store";
import { useNavigate } from "react-router-dom";
import { showPopup } from "../reducer/slices/popupSlice";
import Loader from "../components/loader";
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

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
              {itemsToDisplay.map(({ id, name, quantity, price }) => (
                <li key={id}>
                  {name} - {quantity} x {price}€
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
      </div>
    </div>
  );
}
