// CustomToastContainer.tsx
import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomToastContainerProps extends ToastContainerProps {
  style?: React.CSSProperties; // Make style optional
}

const CustomToastContainer: React.FC<CustomToastContainerProps> = ({
  style,
  ...rest
}) => {
  const defaultStyle: React.CSSProperties = {
    top: "1em",
    right: "1em",
    left: "auto",
  };

  return (
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
      style={{ ...defaultStyle, ...style }}
      toastStyle={{
        fontWeight: 500,
        marginLeft: "auto",
        fontSize: "14px",
        textAlign: "right",
        width: "fit-content",
        minWidth: "300px",
        fontFamily: "inherit",
      }}
      {...rest} // Forward other ToastContainer props
    />
  );
};

export default CustomToastContainer;