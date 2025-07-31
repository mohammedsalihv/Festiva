import React, { useState } from "react";
import { hostLogin } from "@/api/host/hostAuthService";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setHostDetails } from "@/redux/Slice/host/common/hostSlice";
import { IoClose } from "react-icons/io5";
//import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/Input";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import {
  validateHostLoginForm,
  FormState,
} from "@/utils/validations/host/auth/hostLoginValidation";

interface Props {
  onClose: () => void;
  showSignup: () => void;
}

const HostLogin = ({ onClose, showSignup }: Props) => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const mutation = useMutation({
    mutationFn: hostLogin,
    onSuccess: (data) => {
      const hostData = {
        id: data.host.id,
        name: data.host.name,
        email: data.host.email,
        phone: data.host.phone,
        role: data.host.role,
        accessToken: data.host.accessToken,
        refreshToken: data.host.refreshToken,
        profilePic: data.host.profilePic,
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-2 font-poppins">
      <div className="relative w-full sm:max-w-md max-h-[90vh] bg-white shadow-xl overflow-y-auto p-4 sm:p-6 pt-8">
        <IoClose
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-red-500 cursor-pointer"
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 mt-6 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-gray-800">Welcome back</h2>
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={showSignup}
              className="text-main_host hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>

        {/* <div className="space-y-3 mb-4">
          <Button className="flex items-center w-full border border-gray-300 rounded-none py-5 justify-center hover:bg-gray-50">
            <FcGoogle className="text-lg mr-2" />
            <span className="font-poppins">Log in with Google</span>
          </Button>
        </div> */}

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <form>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full border px-4 py-2 focus:outline-none mb-2 ${
              errors.email ? "border border-red-500" : "border"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full px-4 py-2 focus:outline-none ${
              errors.password ? "border border-red-500" : "border"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
          <Button
            type="button"
            disabled={mutation.isPending}
            onClick={handleSubmit}
            className="w-full mt-2 bg-main_host text-white rounded-none hover:bg-red-600 font-poppins text-sm px-2 py-5 gap-2"
          >
            {mutation.isPending ? "Logging in..." : "Log In With Password"}
          </Button>
        </form>

        <p className="text-[11px] text-center text-gray-500 mt-6">
          By logging in you agree to Giggster’s{" "}
          <Link to="/terms" className="underline text-main_host">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline text-main_host">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default HostLogin;
