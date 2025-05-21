import { Images } from "@/assets";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/Button";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { LoginUser, googleLogin } from "@/services/user/userAuthService";
import { setUserDetails } from "@/redux/Slice/user/userSlice";
import { AxiosError } from "axios";
import {
  validateLoginForm,
  FormState,
} from "@/utils/validations/user/Auth/loginValidation";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";


interface ErrorState {
  email?: string;
  password?: string;
}

const Login = () => {
  const [loginForm, setLoginForm] = useState<FormState>({
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
    mutationFn: LoginUser,
    onSuccess: (data) => {
      if (!data.success) {
        toast.error("Login failed. Please check your credentials.");
        return;
      }
      const userData = {
        id: data.user.id,
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        phone: data.user.phone,
        email: data.user.email,
        role: data.user.role,
        profilePic: data.user.profilePic,
        isBlocked: data.user.isBlocked,
        isActive: data.user.isActive,
        timestamp: data.user.timestamp,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      toast.success("Login Successful!");
      dispatch(setUserDetails(userData));
      navigate("/user/home");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      if (error.response) {
        const { data, status } = error.response;
        switch (status) {
          case 401:
            toast.error("Invalid email or password");
            break;
          case 403:
            toast.error("Account suspended. Please contact support");
            break;
          case 429:
            toast.warning("Too many attempts. Try again later");
            break;
          default:
            toast.error(data?.message || "Login failed");
        }
      } else {
        toast.error("Network error. Please check your connection");
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
    const { isValid, errors: validationErrors } = validateLoginForm(loginForm);
    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the form errors");
      return;
    }
    mutation.mutate(loginForm);
  };

 const responseGoogle = async (authResult) => {
  console.log("Google auth result:", authResult); // Check if authResult.code exists
  try {
    if (authResult.code) {
      const result = await googleLogin(authResult.code);
      const user = result.user;
      const token = result.accessToken;

      const userDetails = {
        ...user,
        token,
      };

      dispatch(setUserDetails(userDetails));
      toast.success("Login Successful!");
      navigate("/user/home");
    } else {
      console.log("No code in authResult:", authResult);
      throw new Error("No auth code received from Google login");
    }
  } catch (e) {
    console.error("Error while Google Login...", e);
    toast.error("Login failed. Please try again.");
  }
};

 const GoogleLogin = useGoogleLogin({
  onSuccess: responseGoogle,
  onError: (error) => {
    console.error("Google login error:", error);
    toast.error("Google login failed");
  },
  flow: "auth-code",
  redirect_uri: "http://localhost:5173/user/home",
});

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <CustomToastContainer />
      <Card className="w-full h-screen grid grid-cols-1 md:grid-cols-2 shadow-lg">
        <div
          className="flex items-center justify-center bg-cover bg-center w-full h-64 sm:h-72 md:h-auto relative"
          style={{
            backgroundImage: `url(${
              Images.login_bg || "/default-login-bg.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent"></div>
        </div>
        <Card className="bg-white flex items-center justify-center">
          <div className="w-full max-w-md bg-white p-6 sm:p-8">
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-charcoal">Login</h1>
                <p className="text-sm text-gray-500">
                  Welcome back! Please enter your details
                </p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div
                  className={`w-full rounded-sm transition-all duration-300 flex items-center ${
                    errors.email ? "border-b border-red-500" : "border-b-2"
                  } ${getInputBorderClass(loginForm.email, isEmailFocused)}`}
                >
                  <img
                    className="w-6 h-6 mr-2"
                    src={Images.mail || "/mail-icon.svg"}
                    alt="Email icon"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/mail-icon.svg";
                    }}
                  />
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    onChange={handleChange}
                    className={`w-full bg-transparent px-3 py-2 transition-all duration-300 focus:outline-none border-none ${
                      errors.email ? "placeholder-red-300" : ""
                    }`}
                    placeholder={errors.email ? "" : "Enter your email"}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div
                  className={`w-full rounded-sm transition-all duration-300 flex items-center ${
                    errors.password ? "border-b border-red-500" : "border-b-2"
                  } ${getInputBorderClass(
                    loginForm.password,
                    isPasswordFocused
                  )}`}
                >
                  <img
                    className="w-6 h-6 mr-2"
                    src={Images.lock || "/lock-icon.svg"}
                    alt="Password icon"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/lock-icon.svg";
                    }}
                  />
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-2 transition-all duration-300 border-none focus:outline-none"
                    placeholder={errors.password ? "" : "Enter your password"}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div className="pt-2">
                <Button
                  onClick={handleLogin}
                  disabled={mutation.isPending}
                  className="my-3 text-white w-full h-12 text-lg bg-main_color hover:bg-[#7848F4] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-[#7848F4] font-medium hover:underline focus:outline-none"
                  >
                    Sign up
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center my-6">
                <hr className="flex-grow h-0.5 bg-neutral-300 border-none" />
                <span className="mx-4 whitespace-nowrap text-sm text-neutral-500">
                  or login with
                </span>
                <hr className="flex-grow h-0.5 bg-neutral-300 border-none" />
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-300 hover:border-neutral-500 transition duration-300">
                  <FcGoogle className="w-6 h-6" onClick={GoogleLogin} />
                </button>
              </div>
            </CardContent>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default Login;
