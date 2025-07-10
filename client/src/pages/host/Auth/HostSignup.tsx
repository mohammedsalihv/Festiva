import React, { useState } from "react";
import { hostSignup } from "@/api/host/hostAuthService";
import { validateHostRegisterForm, FormState } from "@/utils/validations/host/auth/hostRegisterValidation";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";

interface ErrorState {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  location?: string;
}

interface Props {
  onClose: () => void;
}

const HostSignup = ({ onClose }: Props) => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<ErrorState>({});
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateHostRegisterForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");
      if (submitError) toast.error(submitError);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    try {
      await hostSignup(formData);
      setSuccess("Host registration successful!");
      toast.success("Host registration successful!");
      setFormData({ name: "", email: "", phone: "", password: "", location: "" });
      setErrors({});
      setSubmitError("");
      navigate("/host/login");
    } catch (err: unknown) {
      let errorMessage = "Something went wrong.";
      if (err instanceof AxiosError) {
        const backendData = err.response?.data;
        if (typeof backendData?.message === "string") {
          toast.error(backendData.message);
          errorMessage = backendData.message;
        } else if (typeof backendData === "object" && backendData !== null) {
          Object.entries(backendData).forEach(([field, message]) => {
            if (typeof message === "string") {
              toast.error(`${field}: ${message}`);
            }
          });
        }
      } else toast.error(errorMessage);
      setSubmitError(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 sm:p-8 text-black space-y-5">
        <button
          onClick={() =>{
            onClose()
             setIsOpen(false)
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
        >
          <GrFormClose />
        </button>

        <h1 className="text-2xl font-bold text-center">Join as a Host</h1>

        {/* Google Button */}
        <button
          type="button"
          className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img src="https://img.icons8.com/color/16/google-logo.png" alt="Google" />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center justify-between gap-4">
          <div className="border-t border-gray-300 flex-grow" />
          <p className="text-sm text-gray-500">or</p>
          <div className="border-t border-gray-300 flex-grow" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className={`w-full border px-4 py-2 rounded-md focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            <div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full border px-4 py-2 rounded-md focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className={`w-full border px-4 py-2 rounded-md focus:outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full border px-4 py-2 rounded-md focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className={`w-full border px-4 py-2 rounded-md focus:outline-none ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
            </div>
          </div>

          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
          >
            Sign up
          </button>

          <p className="text-xs text-center text-gray-500 mt-2">
            By signing up, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/host/login" className="text-green-600 font-medium underline">
              Log in
            </Link>
          </p>

          <p className="text-sm text-center">
            Want to book instead?{" "}
            <Link to="/user/home" className="text-blue-600 font-medium underline">
              Switch to User
            </Link>
          </p>
        </form>

        <CustomToastContainer />
      </div>
    </div>
  );
};

export default HostSignup;
