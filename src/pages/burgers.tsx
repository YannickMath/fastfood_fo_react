import { useGetProductsByCategoryQuery } from "../services/productsByCategory";

type ProductsProps = {
  category?: number | string;
};

export default function Burgers({ category }: ProductsProps) {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsByCategoryQuery(String(category ?? "1"));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Burgers</h1>
      <ul className="list-disc">
        {products?.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
