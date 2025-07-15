import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiAccountCircleLine, RiLogoutCircleRLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import ToggleDark from "../components/toggleDark";
import HeaderNavbar from "../components/headerNavbar";
import Tooltip from "../components/tooltip";
import Latnight from "../assets/Latnight.jpeg";
import { CartCount } from "../utils/cartCount";
import handleLogout from "../utils/handleLogout.";
import type { RootState } from "../reducer/store";

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogin = () => navigate("/login");

  const handleCart = () => navigate("/cart");

  const categories = [
    { id: 1, type: "Burgers" },
    { id: 2, type: "Pizzas" },
    { id: 3, type: "Fries" },
    { id: 4, type: "Drinks" },
    { id: 5, type: "Desserts" },
  ];

  return (
    <header className="w-full dark:bg-black bg-amber-500 dark:text-white text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src={Latnight} alt="FastFood Logo" className="w-30 h-30" />
        <HeaderNavbar categories={categories} />
        <div className="flex items-center space-x-4 relative">
          <Tooltip text="Cart">
            <div className="relative cursor-pointer" onClick={handleCart}>
              <FaShoppingCart className="w-8 h-8" />
              <CartCount />
            </div>
          </Tooltip>

          {isAuthenticated ? (
            <Tooltip text="Disconnect">
              <RiLogoutCircleRLine
                className="w-8 h-8 cursor-pointer"
                onClick={handleLogout}
              />
            </Tooltip>
          ) : (
            <Tooltip text="Connect">
              <RiAccountCircleLine
                className="w-8 h-8 cursor-pointer bounce"
                onClick={handleLogin}
              />
            </Tooltip>
          )}

          <ToggleDark />
        </div>
      </div>
    </header>
  );
}
