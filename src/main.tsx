import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { store } from "./reducer/store.tsx";
import { Provider } from "react-redux";
import Signup from "./pages/signup.tsx";
import Login from "./pages/login.tsx";
import { lazy, Suspense } from "react";
import AuthInitProvider from "./providers/authInitProvider.tsx";
import PrivateRoute from "./components/privateRoute.tsx";

const Layout = lazy(() => import("./layouts/layout.tsx"));
const Home = lazy(() => import("./pages/home.tsx"));
const Burgers = lazy(() => import("./pages/burgers.tsx"));
const Cart = lazy(() => import("./pages/cart.tsx"));

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={""}>
          <AuthInitProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="burgers" element={<Burgers />} />

                <Route element={<PrivateRoute />}>
                  <Route path="cart" element={<Cart />} />
                </Route>
              </Route>
            </Routes>
          </AuthInitProvider>
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
