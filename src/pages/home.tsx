// import Loader from "../components/loader";
// import { useGetProductsByCategoryQuery } from "../services/productsByCategory";

// import ProductCard from "../components/productCard";

export default function Home() {
  // const {
  //   data: products,
  //   error,
  //   isLoading,
  // } = useGetProductsByCategoryQuery("2");

  return (
    <div className="min-h-screen bg-white w-full sm:grid grid-cols-4 grid-rows-3">
      {/* <ProductCard products={products} /> */}
      <div className="col-start-2 col-span-2 row-span-1 bg-{logo} bg-cover border border-gray-200  "></div>
      {/* <ProductCard products={products} /> */}
      <div className="bg-[url('/pizza.jpg')] bg-cover col-start-1 col-span-2 row-span-2 border border-gray-200   "></div>
      <div className="bg-[url('/hamburger.jpg')] bg-cover col-start-3 col-span-4 row-span-2 border border-gray-200   "></div>
    </div>
  );
}

{
  /* {isLoading && <Loader />}
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
            {products.map(({ id, name, price, description }) => (
              <li key={id} className="mb-2">
                {name} - ${price} - {description}
              </li>
            ))}
          </ul>
        )} */
}
