import React, { useState } from "react";
import { registerHost } from "@/services/Auth/authService";
import {
  validateHostRegisterForm,
  FormState,
} from "@/utils/validations/host/auth/hostRegisterValidation";

import { useNavigate } from "react-router-dom";

interface ErrorState {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  location?: string;
}

const HostRegister = () => {
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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } =
      validateHostRegisterForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerHost(formData);
      setSuccess("Host registration successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        location: "",
      });
      setErrors({});
      setSubmitError("");
      navigate("/host/landing");
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-black to-gray-900 text-white font-sans">
      <div className="w-full lg:w-1/2 p-7 lg:p-16 flex flex-col justify-center space-y-6 bg-black text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl font-bold">Superlist</h1>
        <h2 className="text-xl md:text-2xl">Start your 30-day free trial</h2>
        <p className="text-sm text-gray-400">No credit card required</p>
        <div className="space-y-4 mt-6 text-yellow-400 text-sm">
          <p>✅ Invite unlimited colleagues</p>
          <p>✅ Ensure compliance</p>
          <p>✅ Built-in security</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md focus:outline-none"
            />
            {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}

            {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md transition-all"
            >
              Register
            </button>

            <p className="text-xs text-gray-400 mt-4 text-center">
              By creating an account, you agree to the{" "}
              <span className="underline">Terms of Service</span>.
            </p>
            <p className="text-sm text-center mt-2">
              Already registered?{" "}
              <span className="text-red-500 underline cursor-pointer">
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HostRegister;
