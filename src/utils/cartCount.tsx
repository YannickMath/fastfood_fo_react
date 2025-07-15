import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../reducer/store";

export const CartCount = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [guestCount, setGuestCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      const interval = setInterval(() => {
        try {
          const raw = sessionStorage.getItem("cart");
          if (!raw) return setGuestCount(0);
          const parsed = JSON.parse(raw);
          const items = Array.isArray(parsed) ? parsed : [parsed];
          const count = items.reduce((total, item) => total + item.quantity, 0);
          setGuestCount(count);
        } catch {
          setGuestCount(0);
        }
      });

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const count = isAuthenticated
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : guestCount;

  if (count === 0) return null;

  return (
    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
      {count}
    </span>
  );
};
