import React, { useState } from "react";
import { hostLogin } from "@/api/host/hostAuthService";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setHostDetails } from "@/redux/Slice/host/common/hostSlice";
import {
  FormState,
  validateHostLoginForm,
} from "@/utils/validations/host/auth/hostLoginValidation";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

interface Props {
  onClose: () => void;
}

const HostLogin = ({ onClose }: Props) => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: hostLogin,
    onSuccess: (data) => {
      const hostData = {
        id: data.host.id,
        name: data.host.name,
        email: data.host.email,
        role: data.host.role,
        accessToken: data.host.accessToken,
        refreshToken: data.host.refreshToken,
      };

      setTimeout(() => toast.success("Login Successful!"), 500);
      dispatch(setHostDetails(hostData));
      onClose();
      navigate("/host/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } =
      validateHostLoginForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the highlighted errors");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-auto bg-zinc-900 rounded-xl shadow-2xl p-6 sm:p-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg hover:text-red-500"
        >
          <IoClose />
        </button>
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Login to Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full bg-zinc-800 text-white px-4 py-3 rounded-md ${
              errors.email ? "border border-red-500" : ""
            }`}
            autoComplete="username"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full bg-zinc-800 text-white px-4 py-3 rounded-md ${
                errors.password ? "border border-red-500" : ""
              }`}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-white text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-md"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
          <div className="text-center text-sm mt-6">
            <p className="mt-3 text-main_white">
              Don't have an account?{" "}
              <Link
                to="/host/register"
                className="text-red-500 hover:text-red-400 underline"
              >
                Register
              </Link>
            </p>
            <p className="mt-3 text-main_white">
              Switch to user?{" "}
              <Link
                to="/user/home"
                className="text-red-500 hover:text-red-400 underline"
              >
                Switch
              </Link>
            </p>
          </div>
        </form>
        <CustomToastContainer />
      </div>
    </div>
  );
};

export default HostLogin;
