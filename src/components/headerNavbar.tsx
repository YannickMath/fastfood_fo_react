import { NavLink, useNavigate } from "react-router-dom";

interface HeaderNavbarProps {
  categories?: { id: number; type: string }[];
}

export default function HeaderNavbar({ categories }: HeaderNavbarProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <ul className="menu menu-vertical lg:menu-horizontal text-xl font-medium rounded-box space-x-6">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:underline${isActive ? " underline" : ""}`
          }
          onClick={handleGoHome}
        >
          Home
        </NavLink>
      </li>
      {categories?.map((category) => (
        <li key={category.id}>
          <NavLink
            to={`/${category.type.toLowerCase()}/`}
            className={({ isActive }) =>
              `hover:underline${isActive ? " underline" : ""}`
            }
          >
            {category.type}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
