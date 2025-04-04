import { Card, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp, registerUser, sendOtp } from "@/services/Auth/authService";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/redux/userSlice";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { AxiosError } from "axios";




const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = location.state || {};
  const email = userData?.email || "";

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const { mutate: verifyOtpMutation, isPending: verifyingOtp } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      handleRegister();
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;

      console.error("OTP Verification Error:", axiosError);

      if (axiosError.response) {
        console.error("Response Data:", axiosError.response.data);
      }

      toast.error(
        axiosError.response?.data?.message || "Invalid OTP. Please try again."
      );
    },
  });

  const { mutate: registerMutation, isPending: registering } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      const user = {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        hasCompletedPreferences: false,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      dispatch(setUserDetails(user));
      toast.success("Registration successful!");
      navigate("/login");
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;

      toast.error(
        axiosError.response?.data?.message ||
          "Registration failed. Please try again."
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
      setOtp(new Array(6).fill(""));
      setTimer(60);
      inputRefs.current[0]?.focus();
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.dismiss("resend-toast");
      toast.error(axiosError.response?.data?.message || "Failed to resend OTP");
    },
  });

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    // Add additional validation
    if (!/^\d{6}$/.test(otpValue)) {
      setErrorMessage("OTP must be 6 digits only");
      return;
    }

    verifyOtpMutation({ email, otp: otpValue });
  };

  const handleRegister = () => {
    if (!userData) {
      toast.error("Missing user data. Please start registration again.");
      navigate("/signup");
      return;
    }
    registerMutation(userData);
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      resendOtpMutation({ email });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="bg-white shadow-2xl rounded-lg w-full max-w-xs md:max-w-md">
        <CardContent className="p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
            Enter OTP
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mb-4 text-center">
            We've sent a 6-digit OTP to{" "}
            <span className="font-semibold">{email}</span>
          </p>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-2">
              {errorMessage}
            </p>
          )}

          <form onSubmit={handleVerifyOtp}>
            <div className="flex justify-center space-x-2 md:space-x-4 mb-4">
              {[...Array(6)].map((_, index) => (
                <Input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-10 md:w-12 md:h-12 text-lg md:text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-main_color"
                  autoFocus={index === 0}
                  disabled={verifyingOtp || registering}
                />
              ))}
            </div>

            <Button
              type="submit"
              className="h-10 md:h-12 w-full bg-main_color text-white py-2 md:py-3 rounded-lg hover:bg-main_color_dark transition duration-200"
              disabled={verifyingOtp || registering}
            >
              {verifyingOtp ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>

          <p className="text-xs md:text-sm text-gray-600 mt-4 text-center">
            Didn't receive the OTP?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendingOtp || timer > 0}
              className="text-main_color font-medium"
            >
              {timer > 0
                ? `Resend OTP in ${timer}s`
                : resendingOtp
                ? "Sending..."
                : "Resend OTP"}
            </button>
          </p>
        </CardContent>
      </Card>
      <CustomToastContainer />
    </div>
  );
};

export default Otp;
