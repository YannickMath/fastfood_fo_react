import { useSelector } from "react-redux";
import ProductCard from "../components/productCard";
import type { RootState } from "../reducer/store.tsx";
import Loader from "../components/loader.tsx";
import type { Product } from "../types/product.ts";

export default function Fries() {
  const products = useSelector(
    (state: RootState) => state.products.items
  ) as Product[];
  const fries = products.filter((product) => product.category === 3);

  return (
    <div className="w-full min-h-screen flex flex-wrap justify-center items-center bg-gray-100">
      {!products.length && <Loader size="xl" message="Burgers loading..." />}
      {fries.length > 0 ? (
        fries.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="text-gray-500 text-xl">Aucun burger trouvé.</div>
      )}
    </div>
  );
}
