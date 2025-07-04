export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to FastFood</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your favorite food delivered fast!
      </p>
      <button className="btn btn-primary">Order Now</button>
    </div>
  );
}
