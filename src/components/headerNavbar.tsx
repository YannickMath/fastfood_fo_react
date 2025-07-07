import { Link, useNavigate } from "react-router-dom";

interface HeaderNavbarProps {
  categories?: { id: number; type: string }[];
}

export default function HeaderNavbar({ categories }: HeaderNavbarProps) {
  console.log("cat", categories);
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
    <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
      <li>
        <Link to="/" className="hover:underline" onClick={handleGoHome}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/about" className="hover:underline" onClick={handleGoHome}>
          About
        </Link>
      </li>
      {categoriesMap}
    </ul>
  );
}
