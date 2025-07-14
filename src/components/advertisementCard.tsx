import { useDispatch } from "react-redux";
import { addItem } from "../reducer/slices/cartSlice";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: number; // Optional type for advertisement
  image?: string; // Optional image URL
}
export default function AdvertisementCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );
  };

  return (
    <div className="h-full flex flex-col justify-around bg-black border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to="/burgers" className="flex justify-center items-center">
        <img
          className="rounded-t-lg bg-cover max-h-[200px] w-full"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="text-center pb-5">
        <h5 className="text-xl text-white font-semibold tracking-tight dark:text-white">
          {product.category === 2 ? "La" : "Le"} {product.category} du mois !{" "}
          {product.name}
        </h5>
        <div className="flex items-center sm:justify-around justify-center mt-2 p-2">
          <span className="text-xl font-bold text-white">
            {product.price / 100} €
          </span>
          <button
            onClick={addToCart}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
}
