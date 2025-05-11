import React, { useState, ChangeEvent } from "react";
import { Mail, Lock } from "lucide-react";
import { Images } from "@/assets";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "@/services/admin/adminAuthService";
import {
  validateAdminLoginForm,
  AdminFormState,
} from "@/utils/validations/admin/auth/loginValidation";
import { setAdminDetails } from "@/redux/Slice/admin/adminSlice";
import { AxiosError } from "axios";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { toast } from "react-toastify";

interface ErrorState {
  email?: string;
  password?: string;
}

const AdminLogin: React.FC = () => {
  const [loginForm, setLoginForm] = useState<AdminFormState>({
    email: "",
    password: "",
  });

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getInputBorderClass = (value: string, isFocused: boolean) => {
    if (value.trim() !== "" || isFocused) {
      return "border-white border-2";
    }
    return "border-b-2 border-gray-300 hover:border-gray-500";
  };

  const mutation = useMutation({
    mutationFn: adminLogin,
  
    onSuccess: (data) => {
      const adminData = {
        id: data.admin.id,
        email: data.admin.email,
        firstname: data.admin.firstname,
        lastname: data.admin.lastname,
        phone: data.admin.phone,
        role: data.admin.role,
        accessToken: data.admin.accessToken,
        refreshToken: data.admin.refreshToken,
      };
  
      if (data.success) {
        toast.success("Login Successful!");
        dispatch(setAdminDetails(adminData));
        navigate("/admin/dashboard");
      }
    },
  
    onError: (error: AxiosError<{ message?: string }>) => {
      if (error.response) {
        const { data } = error.response;
        const errorMessage =
          data?.message || "An error occurred while logging in.";
        toast.error(errorMessage);
      } else {
        toast.warning("Network error. Please check your connection.");
      }
    },
  });
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [id]: value }));

    if (errors[id as keyof ErrorState]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleLogin = () => {
    const { isValid, errors: validationErrors } =
      validateAdminLoginForm(loginForm);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");
      setTimeout(() => {
        setErrors({});
      }, 5000);
      return;
    }

    mutation.mutate(loginForm);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl flex-col-reverse items-center gap-10  p-8  md:flex-row md:justify-between">
        <div className="w-full md:w-1/2">
          <h2 className="mb-2 text-2xl font-semibold">Welcome to Dashboard</h2>
          <p className="mb-6 text-sm text-gray-500">
            Unauthorized access is strictly prohibited. Only authorized
            personnel should proceed.
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                onChange={handleChange}
                className={`w-full rounded border border-gray-300 py-3 pl-10 pr-3 text-sm focus:border-black focus:outline-none ${getInputBorderClass(
                  loginForm.email,
                  isEmailFocused
                )}`}
              />
                {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                onChange={handleChange}
                className={`w-full rounded border border-gray-300 py-3 pl-10 pr-3 text-sm focus:border-black focus:outline-none  ${getInputBorderClass(
                  loginForm.password,
                  isPasswordFocused
                )}`}
              />
              {errors.password && (
                    <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                  )}
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              onClick={handleLogin}
              type="button"
              className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Logging in" : "Login"}
            </button>
          </form>
          <CustomToastContainer />
        </div>

        <div className="hidden md:block md:w-1/2">
          <img
            src={Images.admin_login}
            alt="Login Illustration"
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
