import { lazy } from "react";
import RoueConfig from "./RouteConfig";
import "./styles/App.scss";
import { ToastContainer } from "react-toastify";
const Navbar = lazy(() => import("./components/layouts/Navbar"));

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <RoueConfig />
    </>
  );
}

export default App;
