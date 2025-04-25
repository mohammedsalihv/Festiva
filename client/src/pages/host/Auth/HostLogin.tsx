import React, { useState } from "react";
import { loginHost } from "@/services/Auth/host/hostAuthService";
import {
  validateHostLoginForm,
  FormState,
} from "@/utils/validations/host/auth/hostLoginValidation";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHostDetails } from "@/redux/Slice/host/hostSlice";
import { useMutation } from "@tanstack/react-query";

const HostLogin = () => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: loginHost,
    onSuccess: (data) => {
      const hostData = {
        id: data.host.id,
        email: data.host.email,
        role: data.host.role,
        accessToken: data.host.accessToken,
        refreshToken: data.host.refreshToken,
        name: data.host.name 
      };

      if (data.success) {
        setTimeout(() => {
          toast.success("Login Successful!");
        }, 3000);
        dispatch(setHostDetails(hostData));
        navigate("/host/dashboard");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      if (error.response) {
        const { status, data } = error.response;
        const errorMessage = data?.message || "An error occurred while logging in.";

        if (status === 403) {
          toast.warning("Host is blocked. Please contact support.");
        } else if (errorMessage === "Invalid credentials") {
          toast.error("Invalid email or password.");
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.warning("Network error. Please check your connection.");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user types
    if (errors[e.target.name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateHostLoginForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the highlighted errors");
      return;
    }

    mutation.mutate(formData);
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
          <h1 className="p-3 font-bold text-xl">Login to Your Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full bg-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none ${
                  errors.email ? "border border-red-500" : ""
                }`}
                autoComplete="username"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full bg-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none ${
                  errors.password ? "border border-red-500" : ""
                }`}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className={`w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md transition-all ${
                mutation.isPending ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {mutation.isPending ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-sm mt-4">
              <p className="text-gray-400">
                By logging in, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-white">
                  Terms of Service
                </Link>
                .
              </p>
              <p className="mt-2">
                Don't have an account?{" "}
                <Link
                  to="/host/register"
                  className="text-red-500 hover:text-red-400 underline"
                >
                  Register
                </Link>
              </p>
              <p className="mt-2">
                <Link
                  to="/host/forgot-password"
                  className="text-gray-400 hover:text-white underline text-xs"
                >
                  Forgot password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <CustomToastContainer />
    </div>
  );
};

export default HostLogin;