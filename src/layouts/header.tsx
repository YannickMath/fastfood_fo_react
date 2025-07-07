import { RiAccountCircleLine } from "react-icons/ri";
import ToggleDark from "../components/toggleDark";
import Latnight from "../assets/Latnight.jpeg";
import { useNavigate } from "react-router-dom";
import HeaderNavbar from "../components/headerNavbar";
import { useGetCategoriesQuery } from "../services/categories";

export default function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  console.log("categories", categories, error, isLoading);

  if (isLoading) return <div>Chargement du layout...</div>;
  if (error) return <div>Erreur lors du chargement</div>;

  return (
    <>
      <header className="w-full bg-blue-600 dark:bg-amber-50 text-white dark:text-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img src={Latnight} alt="FastFood Logo" className="w-34 h-34" />
          <HeaderNavbar categories={categories} />
          <div className="flex items-center space-x-4">
            <RiAccountCircleLine
              className="w-8 h-8 cursor-pointer"
              onClick={handleLogin}
            />
            <ToggleDark />
          </div>
        </div>
      </header>
    </>
  );
}
