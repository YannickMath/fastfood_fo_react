import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  return (
    <div className="w-screen h-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <Outlet /> {/* Ici s’affichera Home ou About */}
      <Footer />
    </div>
  );
}
