import { useGetProductsByCategoryQuery } from "../services/productsByCategory";

export default function Home() {
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery("2");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to FastFood</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your favorite food delivered fast!
      </p>
      <button className="btn btn-primary">Order Now</button>
      <div className="mt-8">
        {isLoading && <p>Loading...</p>}
        {error && (
          <p>
            Error loading products:{" "}
            {"message" in error
              ? error.message
              : "status" in error
              ? `Status ${error.status}`
              : "An unknown error occurred"}
          </p>
        )}
        {products && (
          <ul className="list-disc">
            {products.map((product) => (
              <li key={product.id} className="mb-2">
                {product.name} - ${product.price} - {product.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
