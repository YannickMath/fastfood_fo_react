import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { store, persistor } from "./reducer/store.tsx";
import { Provider } from "react-redux";
import Signup from "./pages/signup.tsx";
import Login from "./pages/login.tsx";
import { lazy, Suspense } from "react";
import AuthInitProvider from "./providers/authInitProvider.tsx";
import PrivateRoute from "./components/privateRoute.tsx";
import Checkout from "./pages/checkout.tsx";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/loader.tsx";

const Layout = lazy(() => import("./layouts/layout.tsx"));
const Home = lazy(() => import("./pages/home.tsx"));
const Burgers = lazy(() => import("./pages/burgers.tsx"));
const Cart = lazy(() => import("./pages/cart.tsx"));
const Pizzas = lazy(() => import("./pages/pizzas.tsx"));
const Fries = lazy(() => import("./pages/fries.tsx"));
const Drinks = lazy(() => import("./pages/drinks.tsx"));
const Desserts = lazy(() => import("./pages/desserts.tsx"));

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate
      loading={<Loader message="Restoring app..." />}
      persistor={persistor}
    >
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
                  <Route path="pizzas" element={<Pizzas />} />
                  <Route path="fries" element={<Fries />} />
                  <Route path="drinks" element={<Drinks />} />
                  <Route path="desserts" element={<Desserts />} />
                  <Route path="cart" element={<Cart />} />

                  <Route element={<PrivateRoute />}>
                    <Route path="checkout" element={<Checkout />} />
                  </Route>
                </Route>
              </Routes>
            </AuthInitProvider>
          </Suspense>
        </BrowserRouter>
      </StrictMode>
    </PersistGate>
  </Provider>
);
