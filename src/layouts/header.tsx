import { RiAccountCircleLine } from "react-icons/ri";
import { Counter } from "../components/counter";
import ToggleDark from "../components/toggleDark";

export default function Header() {
  const openLoginModal = () => {
    // Logic to open the login modal
    console.log("Open login modal");
  };
  return (
    <header className="w-full h-2/5 bg-blue-600 dark:bg-amber-50 text-white dark:text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">FastFood</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex justify-end items-center space-x-4 mt-4">
        <RiAccountCircleLine
          className="w-8 h-8 cursor-pointer"
          onClick={openLoginModal}
        />
        <ToggleDark />
      </div>
    </header>
  );
}
