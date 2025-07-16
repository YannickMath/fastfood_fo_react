import { useSelector } from "react-redux";
import ProductCard from "../components/productCard";
import type { RootState } from "../redux/store.tsx";
import Loader from "../components/loader.tsx";
import type { Product } from "../types/product.ts";

export default function Burgers() {
  const products = useSelector(
    (state: RootState) => state.products.items
  ) as Product[];
  const burgers = products.filter((product) => product.category === 1);

  return (
    <div className="w-full min-h-screen flex flex-wrap justify-center items-center bg-gray-100">
      {!products.length && <Loader size="xl" message="Burgers loading..." />}
      {burgers.length > 0 ? (
        burgers.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="text-gray-500 text-xl">Aucun burger trouvé.</div>
      )}
    </div>
  );
}
