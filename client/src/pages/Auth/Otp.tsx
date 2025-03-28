import { Card, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp, registerUser, sendOtp } from "@/services/Auth/authService";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/redux/userSlice";

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = location.state || {};
  const email = userData?.email || "";
  
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { mutate: verifyOtpMutation, isPending: verifyingOtp } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      handleRegister();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Invalid OTP. Please try again.");
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
      navigate("/home");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
    },
  });

  const { mutate: resendOtpMutation, isPending: resendingOtp } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast.success("OTP resent successfully!");
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    },
  });

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
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
    resendOtpMutation({ email });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input when current is filled
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="bg-white shadow-2xl rounded-lg w-full max-w-xs md:max-w-md">
        <CardContent className="p-6 md:p-10">
          <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-center">
              Enter OTP
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6 text-center">
            We've sent a 6-digit OTP to<span className="font-semibold">{email}</span>
          </p>
          
          <form onSubmit={handleVerifyOtp}>
            <div className="flex justify-center space-x-2 md:space-x-4 mb-4 md:mb-6">
              {[...Array(6)].map((_, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
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
          
          <p className="text-xs md:text-sm text-gray-600 mt-4 md:mt-6 text-center">
            Didn't receive the OTP?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendingOtp}
              className="text-main_color hover:underline font-medium"
            >
              {resendingOtp ? "Sending..." : "Resend OTP"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Otp;