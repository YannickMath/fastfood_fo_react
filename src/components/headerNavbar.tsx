import { Link, useNavigate } from "react-router-dom";

interface HeaderNavbarProps {
  categories?: { id: number; type: string }[];
}

export default function HeaderNavbar({ categories }: HeaderNavbarProps) {
  const categoriesMap = categories?.map((category) => (
    <li key={category.id}>
      <Link to={`/products/${category.type}`} className="hover:underline">
        {category.type}
      </Link>
    </li>
  ));

  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <ul className="menu menu-vertical lg:menu-horizontal text-xl rounded-box text-gray-300 space-x-6">
      <li>
        <Link to="/" className="hover:underline" onClick={handleGoHome}>
          Home
        </Link>
      </li>
      {categoriesMap}
    </ul>
  );
}
