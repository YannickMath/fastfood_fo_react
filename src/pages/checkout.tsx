import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        In Construction by YM ❤️... Page is coming soon
      </h1>
      <p className="text-gray-700">
        <span
          onClick={() => navigate("/cart")}
          className="text-blue-600 underline cursor-pointer"
        >
          Come back to Cart
        </span>
        <span className="mx-2">or</span>
        <span
          onClick={() => navigate("/")}
          className="text-blue-600 underline cursor-pointer"
        >
          Go to Home
        </span>
      </p>
    </div>
  );
}
