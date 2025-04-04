import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToastContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    style={{
      top: "1em",
      right: "1em",
      left: "auto",
    }}
    toastStyle={{
      fontWeight: 500,
      marginLeft: "auto",
      fontSize: "14px",
      textAlign: "right",
      width: "fit-content",
      minWidth: "300px",
      fontFamily: "inherit",
    }}
  />
);

export default CustomToastContainer;