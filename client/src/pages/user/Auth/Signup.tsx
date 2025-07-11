import { Card, CardContent } from "@/components/Card";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { useState, ChangeEvent, FormEvent } from "react";
import { sendOtp, verifyOtp, registerUser } from "@/api/user/auth/userAuthService";
import { validateSignupForm, FormState } from "@/utils/validations/user/Auth/signupValidation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";
import Otp from "@/components/Otp";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";

interface ErrorState {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [form, setForm] = useState<FormState>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [otpError, setOtpError] = useState("");

  // Mutation for sending OTP
  const { mutate: sendOtpMutation, isPending: sendingOtp } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast.success("OTP sent successfully!");
      setShowOtp(true);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
    },
  });

  // Mutation for verifying OTP
  const { mutate: verifyOtpMutation, isPending: verifyingOtp } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      handleRegister();
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      setOtpError(error.response?.data?.message || "Invalid OTP. Please try again.");
    },
  });

  const { mutate: registerMutation, isPending: registering } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setTimeout(() => {
        toast.success("Registration successful!");
      }, 500);
      navigate("/login");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));

    if (errors[id as keyof ErrorState]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isChecked) {
      toast.error("Please accept the terms and conditions to proceed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setErrors((prev) => ({ ...prev, terms: "You must accept the terms and conditions" }));
      return;
    }

    const { isValid, errors: validationErrors } = validateSignupForm(form);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");
      setTimeout(() => {
        setErrors({});
      }, 5000);
      return;
    }

    sendOtpMutation({ email: form.email });
  };

  const handleVerifyOtp = (otp: string) => {
    setOtpError("");
    verifyOtpMutation({ email: form.email, otp });
  };

  const handleResendOtp = () => {
    resendOtpMutation({ email: form.email });
  };

  const handleRegister = () => {
    registerMutation(form);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Card className="w-full h-full md:h-screen grid grid-cols-1 md:grid-cols-[40%_60%] overflow-hidden">
        <div className="flex items-center justify-center bg-main_color w-full h-full px-4 py-6 sm:px-8 sm:py-12">
          <div className="text-white text-center">
            <p className="text-start text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-extrabold">
              Explore limitless
            </p>
            <p className="text-start text-2xl sm:text-3xl md:text-3xl font-extrabold">
              service possibilities.
            </p>
            <p className="text-start font-extrabold bg-gradient-to-r from-yellow-600 via-green-100 to-cyan-300 bg-clip-text text-transparent text-sm sm:text-1xl md:text-2xl">
              Start exploring
            </p>
          </div>
        </div>
        <Card className="bg-white flex flex-col justify-end md:justify-center w-full max-w-4xl md:max-w-none h-full md:items-center">
          <div className="w-full h-full bg-white p-4 sm:p-8 flex flex-col">
            {showOtp && (
              <Otp
                email={form.email}
                onVerify={handleVerifyOtp}
                onResend={handleResendOtp}
                loading={verifyingOtp || registering || resendingOtp}
                errorMessage={otpError}
                resendTimeOut={60}
              />
            )}
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                <CardContent className="space-y-6 flex-grow">
                  <div className="text-center space-y-2 p-3">
                    <h1 className="text-3xl font-bold text-charcoal">Signup</h1>
                    <p className="text-neutral-400 font-JosephicSans">
                      Create an account to enjoy services
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="firstname" className="text-sm font-medium">
                        Firstname
                      </Label>
                      <Input
                        id="firstname"
                        type="text"
                        className="w-full border-b-2 border-neutral-600 focus:border-main_color hover:border-white/40 transition-all duration-300"
                        onChange={handleChange}
                        value={form.firstname}
                        disabled={sendingOtp}
                      />
                      {errors.firstname && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lastname" className="text-sm font-medium">
                        Lastname
                      </Label>
                      <Input
                        id="lastname"
                        type="text"
                        className="w-full border-b-2 border-neutral-600 focus:border-main_color hover:border-white/40 transition-all duration-300"
                        onChange={handleChange}
                        value={form.lastname}
                        disabled={sendingOtp}
                      />
                      {errors.lastname && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="w-full border-b-2 border-neutral-600 focus:border-main_color hover:border-white/40 transition-all duration-300"
                        onChange={handleChange}
                        value={form.email}
                        disabled={sendingOtp}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="text"
                        className="w-full border-b-2 border-neutral-600 focus:border-main_color hover:border-white/40 transition-all duration-300"
                        onChange={handleChange}
                        value={form.phone}
                        disabled={sendingOtp}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        className="w-full border-b-2 border-neutral-600 focus:border-main_color hover:border-white/40 transition-all duration-300"
                        onChange={handleChange}
                        value={form.password}
                        disabled={sendingOtp}
                      />
                      <p
                        className={`text-xs mt-1 ${
                          errors.password ? "text-red-700 font-bold" : "text-red-500"
                        }`}
                      >
                        {errors.password
                          ? errors.password
                          : "Password must include uppercase, lowercase, number, and special character"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="w-full border-b-2 border-neutral-600 focus:border-main_color hover:border-white/40 transition-all duration-300"
                        onChange={handleChange}
                        value={form.confirmPassword}
                        disabled={sendingOtp}
                      />
                      <p
                        className={`text-xs mt-1 ${
                          errors.confirmPassword ? "text-red-700 font-bold" : "text-red-500"
                        }`}
                      >
                        {errors.confirmPassword
                          ? errors.confirmPassword
                          : "Password must include uppercase, lowercase, number, and special character"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-4 md:mt-auto">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-1 max-sm:flex-nowrap max-sm:text-xs">
                        <Checkbox
                          id="terms"
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            setIsChecked(Boolean(checked));
                            if (errors.terms) {
                              setErrors((prev) => ({ ...prev, terms: undefined }));
                            }
                          }}
                          className={`h-4 w-4 ${errors.terms ? "border-red-500" : ""}`}
                        />
                        <label
                          htmlFor="terms"
                          className="font-JosephicSans text-sm max-sm:text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <span className="text-main_color hover:underline font-JosephicSans md:text-sm max-sm:text-xs">
                            terms and conditions
                          </span>
                        </label>
                        <label className="font-JosephicSans text-sm max-sm:text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 max-sm:pl-2 sm:pl-4">
                          Already have an account?{" "}
                          <span className="text-main_color hover:underline font-JosephicSans">
                            <Link to={"/login"}>Login</Link>
                          </span>
                        </label>
                      </div>
                      {errors.terms && (
                        <p className="text-sm max-sm:text-xs text-red-500">{errors.terms}</p>
                      )}
                    </div>
                    <div className="w-full sm:w-auto bg-main_color rounded-md h-12">
                      <Button
                        type="submit"
                        disabled={sendingOtp}
                        className="w-full h-full text-white"
                      >
                        {sendingOtp ? "Sending OTP" : "Signup"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </form>
            
          </div>
          <CustomToastContainer />
        </Card>
      </Card>
    </div>
  );
};

export default Signup;