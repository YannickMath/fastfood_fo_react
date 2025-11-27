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
    dispatch(setAuthenticated(Boolean(token)));
  }, [dispatch]);

  useEffect(() => {
    if (products) dispatch(setProducts(products));
  }, [products, dispatch]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <Popup />
      <main className="flex-1 w-full pt-30">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
