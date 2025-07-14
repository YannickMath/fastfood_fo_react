import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducer/slices/authSlice";
import { showPopup } from "../reducer/slices/popupSlice";
import type { RootState } from "../reducer/store";
import { RiAccountCircleLine, RiLogoutCircleRLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import ToggleDark from "../components/toggleDark";
import HeaderNavbar from "../components/headerNavbar";
import Tooltip from "../components/tooltip";
import Latnight from "../assets/Latnight.jpeg";
import React, { useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [authChecked, setAuthChecked] = React.useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    setAuthChecked(true);
  }, [isAuthenticated]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    dispatch(logout());
    dispatch(showPopup("Disconnected successfully!"));
    navigate("/");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const categories = [
    { id: 1, type: "Burgers" },
    { id: 2, type: "Pizzas" },
    { id: 3, type: "Fries" },
    { id: 4, type: "Drinks" },
    { id: 5, type: "Desserts" },
  ];

  return (
    <header className="w-full bg-blue-600 dark:bg-amber-50 text-white dark:text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src={Latnight} alt="FastFood Logo" className="w-30 h-30" />
        <HeaderNavbar categories={categories} />
        <div className="flex items-center space-x-4">
          <Tooltip text="Panier">
            <FaShoppingCart
              className="w-8 h-8 cursor-pointer"
              onClick={handleCart}
            />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
            )}
          </Tooltip>
          {authChecked ? (
            isAuthenticated ? (
              <>
                <Tooltip text="Déconnexion">
                  <RiLogoutCircleRLine
                    className="w-8 h-8 cursor-pointer"
                    onClick={handleLogout}
                  />
                </Tooltip>
              </>
            ) : (
              <Tooltip text="Connexion">
                <RiAccountCircleLine
                  className="w-8 h-8 cursor-pointer bounce"
                  onClick={handleLogin}
                />
              </Tooltip>
            )
          ) : null}
          <ToggleDark />
        </div>
      </div>
    </header>
  );
}
