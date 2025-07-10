import { Card, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { useState, useEffect, useRef } from "react";

interface otpVerificationProps {
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  loading?: boolean;
  errorMessage?: string;
  resendTimeOut?: number;
  buttonColorClass?: string;
  buttonTextColorClass?: string;
}

const Otp = ({
  email,
  onVerify,
  onResend,
  buttonColorClass,
  buttonTextColorClass,
  loading = false,
  resendTimeOut = 60,
  errorMessage = "",
}: otpVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6 && /^\d{6}$/.test(otpValue)) {
      onVerify(otpValue);
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      onResend();
      setOtp(new Array(6).fill(""));
      setTimer(resendTimeOut);
      inputRefs.current[0]?.focus();
    }
  };

  setTimeout(() => {
    errorMessage = "";
  }, 2000);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center backdrop-blur-sm bg-black/30 px-4">
      <Card className="bg-white shadow-2xl rounded-lg w-full max-w-xs md:max-w-md">
        {errorMessage && (
          <p className="text-red-500 text-sm text-center font-bold py-5">
            {errorMessage}
          </p>
        )}
        <CardContent className="p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
            Enter OTP
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mb-4 text-center">
            We've sent a 6-digit OTP to{" "}
            <span className="font-semibold">{email}</span>
          </p>
          <form onSubmit={handleSubmit}>
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
                  disabled={loading}
                />
              ))}
            </div>

            <Button
              type="submit"
              className={`h-10 md:h-12 w-full ${buttonColorClass ?? "bg-main_color hover:bg-main_color_dark"} ${buttonTextColorClass ?? "text-white"} py-2 md:py-3 rounded-lg transition duration-200`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>

          <p className="text-xs md:text-sm text-gray-600 mt-4 text-center">
            Didn't receive the OTP?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={timer > 0}
              className="text-main_color font-medium"
            >
              {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
            </button>
          </p>
        </CardContent>
      </Card>
      <CustomToastContainer />
    </div>
  );
};

export default Otp;
