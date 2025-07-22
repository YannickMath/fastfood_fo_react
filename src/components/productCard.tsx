import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import type { RootState } from "../redux/store";
import handleAddToCart from "../utils/handleAddToCart";
// import handleRemoveFromCart from "../utils/handleRemoveFromCart";
import type { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div className="card w-96 bg-base-100 shadow-xl m-4 slide">
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <div className="flex space-x-2">
            <button
              onClick={() =>
                handleAddToCart(product, isAuthenticated, dispatch)
              }
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              +
            </button>
            <button
              // onClick={() =>
              //   handleRemoveFromCart(product, isAuthenticated, dispatch)
              // }
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
