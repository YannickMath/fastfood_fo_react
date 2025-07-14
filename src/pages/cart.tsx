import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../reducer/store";
import { useNavigate } from "react-router-dom";
import { showPopup } from "../reducer/slices/popupSlice";
import Loader from "../components/loader";

export default function Cart() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const handleShowPopup = (message: string) => {
    dispatch(showPopup(message));
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {cartItems.length < 1 ? (
        <div className="text-center text-gray-500 text-2xl">
          Your cart is empty.
        </div>
      ) : (
        <div className="text-center text-gray-900">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          {cartItems.length > 0 ? (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Items:</h2>
              <ul className="list-disc list-inside">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} x {item.price}€
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Loader size="xl" message="Loading cart items..." />
          )}
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
