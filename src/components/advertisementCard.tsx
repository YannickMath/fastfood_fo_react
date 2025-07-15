import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../reducer/store";
import handleAddToCart from "../utils/handleAddToCart";
import type { Product } from "../types/product";

export default function AdvertisementCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const categoryName: Record<number, string> = {
    1: "Burger",
    2: "Pizza",
  };

  return (
    <div className="h-full flex flex-col justify-around bg-black border border-gray-200 shadow ">
      <Link to="/burgers" className="flex justify-center items-center">
        <img
          className="rounded-t-lg bg-cover max-h-[200px] w-full"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="text-center pb-5">
        <h5 className="text-xl text-white font-semibold tracking-tight ">
          {product.category === 2 ? "La " : "Le "}
          {categoryName[product.category]} du mois ! {product.name}
        </h5>
        <div className="flex items-center sm:justify-around justify-center mt-2 p-2">
          <span className="text-xl font-bold text-white">
            {product.price / 100} €
          </span>
          <button
            onClick={() => handleAddToCart(product, isAuthenticated, dispatch)}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}
