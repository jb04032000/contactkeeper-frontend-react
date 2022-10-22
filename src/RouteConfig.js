import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import { loader } from "./utils/helpers";
import setAuthToken from "./utils/setAuthToken";

const Home = lazy(() => import("./components/pages/Home"));
const Login = lazy(() => import("./components/auth/Login"));
const Register = lazy(() => import("./components/auth/Register"));
const About = lazy(() => import("./components/pages/About"));
const Nopagefound = lazy(() => import("./components/pages/Nopagefound"));

if (localStorage.contactKeeperToken) {
  setAuthToken(localStorage.contactKeeperToken);
}

function RoueConfig() {
  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          {loader()}
        </div>
      }
    >
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route path="/about" exact element={<About />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="*" element={<Nopagefound />} />
      </Routes>
    </Suspense>
  );
}

export default RoueConfig;
