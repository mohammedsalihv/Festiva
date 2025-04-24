import React, { useState } from "react";
import { loginHost } from "@/services/Auth/host/hostAuthService"; // Adjusted for login service
import {
  validateHostLoginForm,
  FormState,
} from "@/utils/validations/host/auth/hostLoginValidation";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

interface ErrorState {
  email?: string;
  password?: string;
}

const HostLogin = () => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormState) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } =
      validateHostLoginForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");

      setTimeout(() => {
        setErrors({});
      }, 5000);
      return;
    }

    try {
      await loginHost(formData);
      setTimeout(() => {
        toast.success("Login successful!");
      }, 3000);
      setFormData({
        email: "",
        password: "",
      });
      setErrors({});
      navigate("/host/dashboard");
    } catch (err: unknown) {
      let errorMessage = "Something went wrong.";

      if (err instanceof AxiosError) {
        const backendData = err.response?.data;

        if (typeof backendData?.message === "string") {
          toast.error(backendData.message);
          errorMessage = backendData.message;
        }

        else if (typeof backendData === "object" && backendData !== null) {
          Object.entries(backendData).forEach(([field, message]) => {
            if (typeof message === "string") {
              toast.error(`${field}: ${message}`);
            }
          });
        }
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-gray-900 to-black text-white font-sans flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-7 lg:p-16 flex flex-col justify-center space-y-6 text-center lg:text-left bg-black/30">
        <h1 className="text-3xl md:text-4xl font-bold">Superlist</h1>
        <h2 className="text-xl md:text-2xl">Login to your account</h2>
        <p className="text-sm text-gray-400">
          Secure login for your convenience
        </p>
        <div className="space-y-4 mt-6 text-yellow-400 text-sm">
          <p>✅ Manage your tasks easily</p>
          <p>✅ Stay organized</p>
          <p>✅ Safe and secure login</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="p-3 font-bold">Login to Your Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md transition-all"
            >
              Login
            </button>

            <p className="text-xs text-gray-400 mt-4 text-center">
              By logging in, you agree to the{" "}
              <span className="underline">Terms of Service</span>.
            </p>
            <p className="text-sm text-center mt-2">
              Don't have an account?{" "}
              <span className="text-red-500 underline cursor-pointer">
                <Link to={"/host/register"}>Register</Link>
              </span>
            </p>
          </form>
        </div>
        <CustomToastContainer />
      </div>
    </div>
  );
};

export default HostLogin;
