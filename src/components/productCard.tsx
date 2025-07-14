import { useAppDispatch } from "../reducer/hooks";
import { addItem } from "../reducer/slices/cartSlice";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { id, name, description, price, image } = product;
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price, quantity: 1 }));
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl m-4 slide">
      <figure>
        <img src={image} alt={name} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
