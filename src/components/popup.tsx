import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { hidePopup } from "../redux/reducers/popupSlice";
import { useEffect } from "react";

export default function Popup() {
  const dispatch = useDispatch();
  const { visible, message } = useSelector((state: RootState) => state.popup);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hidePopup());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
    </div>
  );
}
