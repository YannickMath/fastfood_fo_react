import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Popup from "../components/popup";
import { setAuthenticated } from "../redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGetProductsQuery } from "../services/products";
import { setProducts } from "../redux/reducers/productSlice";

export default function Layout() {
  const dispatch = useDispatch();

  const { data: products } = useGetProductsQuery();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) dispatch(setAuthenticated(true));
    if (!token) {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (products) dispatch(setProducts(products));
  }, [products, dispatch]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Header />
      <Popup />
      <div className="pt-30 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
