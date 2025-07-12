import { RiAccountCircleLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import ToggleDark from "../components/toggleDark";
import Latnight from "../assets/Latnight.jpeg";
import { useNavigate } from "react-router-dom";
import HeaderNavbar from "../components/headerNavbar";
import Tooltip from "../components/tooltip";
import useIsUserConnected from "../hooks/isUserConnected";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { showPopup } from "../reducer/slices/popupSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserConnected, isLoading } = useIsUserConnected();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
    dispatch(showPopup("Deconnection in process !"));
    window.location.reload();
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
        <img src={Latnight} alt="FastFood Logo" className="w-30 h-30 " />
        <HeaderNavbar categories={categories} />
        <div className="flex items-center space-x-4">
          {!isLoading && (
            <>
              {isUserConnected ? (
                <Tooltip text="Panier">
                  <FaShoppingCart
                    className="w-8 h-8 cursor-pointer"
                    onClick={handleCart}
                  />
                </Tooltip>
              ) : (
                <Tooltip text="Connexion">
                  <RiAccountCircleLine
                    className="w-8 h-8 cursor-pointer"
                    onClick={handleLogin}
                  />
                </Tooltip>
              )}
              {isUserConnected && (
                <Tooltip text="Deconnection">
                  <RiLogoutCircleRLine
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => {
                      handleLogout();
                    }}
                  />
                </Tooltip>
              )}
            </>
          )}
          <ToggleDark />
        </div>
      </div>
    </header>
  );
}
