import { Link, useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "../services/login";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthenticationApi } from "../services/checkAuthentication";
import { setAuthenticated, setUser } from "../reducer/slices/authSlice";
import { showPopup } from "../reducer/slices/popupSlice";
import Popup from "../components/popup";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postLogin, { error, isLoading, isSuccess }] = usePostLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(showPopup("Login successful!"));
      navigate("/");
    }
  }, [isSuccess, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await postLogin({ email, password }).unwrap();
      const { token, ...userData } = result;

      localStorage.setItem("jwt", token);
      dispatch(setAuthenticated(true));
      dispatch(setUser(userData));

      dispatch(
        checkAuthenticationApi.util.invalidateTags(["CheckAuthentication"])
      );

      setEmail("");
      setPassword("");
      sessionStorage.clear();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2 block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          {isSuccess && <Popup />}

          {error && (
            <p className="text-red-600 text-sm mt-2">
              Login failed. Please try again.
            </p>
          )}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
