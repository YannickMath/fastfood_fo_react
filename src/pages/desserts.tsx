import { useSelector } from "react-redux";
import ProductCard from "../components/productCard";
import type { RootState } from "../reducer/store.tsx";
import Loader from "../components/loader.tsx";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: number;
  image?: string;
}
export default function Desserts() {
  const products = useSelector((state: RootState) => state.products.items);
  //Filter products to only include burgers category 1
  const desserts = products.filter(
    (product: Product) => product.category === 1
  );
  //log typeof for category and products

  return (
    <div className="w-full min-h-screen flex flex-wrap justify-center items-center bg-gray-100">
      {!products.length && <Loader size="xl" message="Burgers loading..." />}
      {desserts.length > 0 ? (
        desserts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="text-gray-500 text-xl">Aucun burger trouvé.</div>
      )}
    </div>
  );
}
