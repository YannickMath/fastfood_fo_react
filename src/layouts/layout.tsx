import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Popup from "../components/popup";
// import { useGetCategoriesQuery } from "../services/categories";
// import FullPageLoader from "../components/fullPageLoader";

export default function Layout() {
  // const handleLogin = () => {
  //   Navigate("/login");
  // };

  // const { data: categories, error, isLoading } = useGetCategoriesQuery();
  // console.log("categories", categories, error, isLoading);

  // if (isLoading) return <FullPageLoader />;
  // if (error) return <div>Erreur lors du chargement</div>;

  return (
    <div className="w-screen h-full flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      {/* {isLoading && <FullPageLoader />} */}
      <Popup />
      <Outlet /> {/* Ici s’affichera Home ou About */}
      <Footer />
    </div>
  );
}
