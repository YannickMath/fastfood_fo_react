import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { store } from "./reducer/store.tsx";
import { Provider } from "react-redux";
import Signup from "./pages/signup.tsx";
import Login from "./pages/login.tsx";
import { lazy } from "react";
import { Suspense } from "react";

const About = lazy(() => import("./pages/about.tsx"));
const Layout = lazy(() => import("./layouts/layout.tsx"));
const Home = lazy(() => import("./pages/home.tsx"));

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login handleLogout={() => {}} />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
