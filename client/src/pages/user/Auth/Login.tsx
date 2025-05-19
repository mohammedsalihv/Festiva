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
import { LoginUser, GoogleLogin } from "@/services/user/userAuthService";
import { setUserDetails } from "@/redux/Slice/user/userSlice";
import { AxiosError } from "axios";
import {
  validateLoginForm,
  FormState,
} from "@/utils/validations/user/Auth/loginValidation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import jwtDecode from 'jwt-decode';
import { useGoogleLogin } from "@react-oauth/google";
import logger from "@/utils/logger";

interface ErrorState {
  email?: string;
  password?: string;
}

interface GoogleLoginData {
  idToken: string;
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

      if (data.success) {
        setTimeout(() => {
          toast.success(" Login Successful!");
        }, 500);
        dispatch(setUserDetails(userData));
        navigate("/user/home");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      if (error.response) {
        const { data } = error.response;
        const errorMessage = data?.message;
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
    const { isValid, errors: validationErrors } = validateLoginForm(loginForm);
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

 const googleLoginMutation = useMutation({
  mutationFn: GoogleLogin,
  onSuccess: (data) => {
    const user = data.user;
    const userData = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      role: user.role,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    dispatch(setUserDetails(userData));
    toast.success("Login successful!");
    navigate("/user/home");
  },
  onError: (error: AxiosError) => {
    if (error.response && error.response.status === 403) {
      toast.error((error.response.data as { message: string }).message);
    } else {
      toast.error("Google login failed. Please try again.");
    }
  },
});


const googleLogin = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    const idToken = (tokenResponse as any).id_token || (tokenResponse as any).access_token;

    if (!idToken) {
      toast.error("Google login failed. No ID token received.");
      return;
    }

    const googleLoginData = {
      idToken,
    };

    googleLoginMutation.mutate(googleLoginData);
  },
  onError: () => toast.error("Google login failed."),
  flow: "implicit",
});




  return (
    <div className="flex items-center justify-center min-h-screen">
      <CustomToastContainer />

      <Card className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
        <div
          className="flex items-center justify-center bg-cover bg-center w-full h-64 sm:h-72 md:h-auto relative"
          style={{ backgroundImage: `url(${Images.login_bg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent"></div>
        </div>
        <Card className="bg-white flex items-center justify-center">
          <div className="w-full max-w-md bg-white p-6 sm:p-8">
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-charcoal">Login</h1>
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
                  <img className="w-6 h-6 mr-2" src={Images.mail} alt="" />
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    onChange={handleChange}
                    className={`w-full bg-transparent px-3 py-2 transition-all duration-300  focus:outline-none border-none ${
                      errors.email ? "border-b border-red-500" : ""
                    }`}
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
                  className={`w-full rounded-sm transition-all duration-300 flex items-center border-b-2 ${getInputBorderClass(
                    loginForm.password,
                    isPasswordFocused
                  )}`}
                >
                  <img className="w-8 h-6 mr-2" src={Images.lock} alt="" />
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-2 transition-all duration-300 border-none focus:outline-none"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <Button
                  onClick={handleLogin}
                  className="my-3 text-white w-full h-12 text-lg bg-main_color hover:bg-[#7848F4]"
                >
                  {mutation.isPending ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center text-sm text-gray-600 font-JosephicSans">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-[#7848F4] font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center my-6">
                <hr className="flex-grow h-0.5 bg-neutral-300 border-none" />
                <span className="mx-4 whitespace-nowrap text-sm text-neutral-500 font-JosephicSans">
                  or login with
                </span>
                <hr className="flex-grow h-0.5 bg-neutral-300 border-none" />
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-300 hover:border-neutral-500 transition duration-300">
                  <FcGoogle className="w-6 h-6" onClick={() => googleLogin()}/>
                </button>
                <button className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-300 hover:border-neutral-500 transition duration-300">
                  <FaGithub className="w-6 h-6" />
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
