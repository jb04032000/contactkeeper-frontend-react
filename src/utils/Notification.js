import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = (type, message) =>
  toast[type](message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1500,
  });

export default Notification;
