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
export default function Pizzas() {
  const products = useSelector((state: RootState) => state.products.items);
  //Filter products to only include burgers category 1
  const pizzas = products.filter((product: Product) => product.category === 2);
  //log typeof for category and products

  return (
    <div className="w-full min-h-screen flex flex-wrap justify-center items-center bg-gray-100">
      {!products.length && <Loader size="xl" message="Burgers loading..." />}
      {pizzas.length > 0 ? (
        pizzas.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="text-gray-500 text-xl">Aucun burger trouvé.</div>
      )}
    </div>
  );
}
