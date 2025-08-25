import React, { useState } from "react";
import {
  hostSignup,
  validateEmail,
  hostGoogleSignup,
} from "@/api/host/hostAuthService";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/base/auth/firebase";
import { useMutation } from "@tanstack/react-query";
import {
  validateHostRegisterForm,
  FormState,
} from "@/utils/validations/host/auth/hostRegisterValidation";
import { sendOtp, verifyOtp } from "@/api/user/auth/userAuthService";
import CustomToastContainer from "@/reusable-components/messages/ToastContainer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { GrFormClose } from "react-icons/gr";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FcGoogle } from "react-icons/fc";
import Otp from "@/components/Otp";
import { useDispatch } from "react-redux";
import { setHostDetails } from "@/redux/Slice/host/common/hostSlice";

interface ErrorState {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  location?: string;
}

interface Props {
  onClose: () => void;
  showLogin: () => void;
}

const HostSignup = ({ onClose, showLogin }: Props) => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { mutate: registerMutation, isPending: registering } = useMutation({
    mutationFn: hostSignup,
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/host/landing");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    },
  });

  const { mutate: sendOtpMutation, isPending: sendingOtp } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast.success("OTP sent successfully!");
      setShowOtp(true);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    },
  });

  const { mutate: verifyOtpMutation, isPending: verifyingOtp } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      handleRegister();
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      setOtpError(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    },
  });

  const { mutate: resendOtpMutation, isPending: resendingOtp } = useMutation({
    mutationFn: sendOtp,
    onMutate: () => {
      toast.dismiss("resend-toast");
      toast.loading("Sending OTP...", { toastId: "resend-toast" });
    },
    onSuccess: () => {
      toast.dismiss("resend-toast");
      toast.success("OTP resent successfully!", { autoClose: 3000 });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.dismiss("resend-toast");
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { isValid, errors: validationErrors } =
      validateHostRegisterForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");
      setTimeout(() => setErrors({}), 5000);
      setLoading(false);
      return;
    }

    await validateEmail(formData.email)
      .then(() => {
        sendOtpMutation({ email: formData.email });
      })
      .catch((error: AxiosError<{ message?: string }>) => {
        toast.error(error.response?.data?.message || "Email validation failed");
        setLoading(false);
      });
  };

  const handleVerifyOtp = (otp: string) => {
    setOtpError("");
    verifyOtpMutation({ email: formData.email, otp });
  };

  const handleResendOtp = () => {
    resendOtpMutation({ email: formData.email });
  };

  const handleRegister = () => {
    registerMutation(formData);
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const name = user.displayName || "";
      const email = user.email || "";
      const phone = user.phoneNumber || "";
      const location = "";
      const photo = user.photoURL || "";

      const response = await hostGoogleSignup({
        name,
        email,
        phone,
        location,
        profilePic: photo,
        signupMethod: "google",
      });

      const { host, accessToken, refreshToken } = response;

      const hostData = {
        id: host.id,
        name: host.name,
        email: host.email,
        phone: host.phone,
        profilePic: host.profilePic,
        role: host.role,
        accessToken,
        refreshToken,
      };
      dispatch(setHostDetails(hostData));
      navigate("/host/dashboard");
    } catch (error) {
      toast.error("Google Sign-In failed. Please try again.");
      console.error(error);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-6 font-poppins">
      <div className="relative w-full max-w-xl bg-white shadow-xl p-4 sm:p-8 text-black space-y-5">
        <GrFormClose
          className="absolute top-3 right-3 text-black hover:text-red-500 cursor-pointer text-xl"
          onClick={() => {
            onClose();
            setIsOpen(false);
          }}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 mt-6 text-center sm:text-left">
          <h2 className="text-xl font-bold text-gray-800 font-poppins">
            Join as Host
          </h2>
          <p className="text-sm text-gray-600 font-poppins">
            Already have an account?{" "}
            <span
              onClick={() => {
                setIsOpen(false);
                showLogin();
              }}
              className="text-main_host hover:text-red-600 cursor-pointer hover:underline font-poppins"
            >
              Log In
            </span>
          </p>
        </div>

        {!showOtp ? (
          <>
            <div className="space-y-3 mb-4">
              <Button
                onClick={handleGoogleSignup}
                className="flex gap-2 items-center w-full border border-gray-300 rounded-none py-5 md:py-7 justify-center hover:bg-gray-100 "
              >
                <FcGoogle size={20} />
                <span className="font-poppins">Continue with Google</span>
              </Button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="border-t border-gray-300 flex-grow" />
              <p className="text-sm text-gray-500">or</p>
              <div className="border-t border-gray-300 flex-grow" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={sendingOtp}
                    placeholder="Name"
                    className={`w-full border px-4 py-2 focus:outline-none ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={sendingOtp}
                    placeholder="Email"
                    className={`w-full border px-4 py-2 focus:outline-none ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={sendingOtp}
                    placeholder="Phone"
                    className={`w-full border px-4 py-2 focus:outline-none ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={sendingOtp}
                    placeholder="Password"
                    className={`w-full border px-4 py-2 focus:outline-none ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={sendingOtp}
                    placeholder="Location"
                    className={`w-full border px-4 py-2 focus:outline-none ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs">{errors.location}</p>
                  )}
                </div>
              </div>

              <p className="text-xs text-center text-gray-500 mt-2 font-poppins">
                By signing up, you agree to our{" "}
                <span className="underline cursor-pointer text-main_host">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer text-main_host">
                  Privacy Policy
                </span>
                .
              </p>

              <Button
                type="submit"
                className="w-full bg-main_host hover:bg-red-600 text-white py-2 font-poppins transition rounded-none"
              >
                {loading ? "Sending OTP..." : "Sign up"}
              </Button>
            </form>
          </>
        ) : (
          <Otp
            email={formData.email}
            onVerify={handleVerifyOtp}
            onResend={handleResendOtp}
            buttonColorClass="bg-main_host hover:bg-red-600"
            buttonTextColorClass="text-white"
            loading={verifyingOtp || resendingOtp || registering}
            errorMessage={otpError}
            resendTimeOut={60}
          />
        )}

        <CustomToastContainer />
      </div>
    </div>
  );
};

export default HostSignup;
