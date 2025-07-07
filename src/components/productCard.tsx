type Product = {
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductCard({ products }: { products: Product }) {
  const { name, description, price } = products;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img alt={name} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
