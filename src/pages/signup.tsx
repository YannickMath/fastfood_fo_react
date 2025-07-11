import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePostSignupMutation } from "../services/signup";
import { useDispatch } from "react-redux";
import { checkAuthenticationApi } from "../services/checkAuthentication";
import useNavigateToHome from "../utils/navigateToHome";

export default function Signup() {
  const dispatch = useDispatch();
  const navigateToHome = useNavigateToHome();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [postSignup, { error, isLoading, isSuccess }] = usePostSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      navigateToHome();
    }
  }, [isSuccess, navigateToHome]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await postSignup({ username, email, password }).unwrap();
      localStorage.setItem("jwt", result.token);
      dispatch(
        checkAuthenticationApi.util.invalidateTags(["CheckAuthentication"])
      );
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="mt-2 block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm"
            />
          </div>

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
              className="flex w-full justify-center rounded-md cursor-pointer bg-indigo-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-2">
              Signup failed. Please try again.
            </p>
          )}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
