import { Images } from "@/assets";
import { Card, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const getInputBorderClass = (value: string, isFocused: boolean) => {
    if (value.trim() !== "" || isFocused) {
      return "border-white border-2";
    }
    return "border-b-2 border-gray-300 hover:border-gray-500";
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
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
                  className={`w-full rounded-sm transition-all duration-300 flex items-center border-b-2 ${getInputBorderClass(
                    emailValue,
                    isEmailFocused
                  )}`}
                >
                  <img className="w-6 h-6 mr-2" src={Images.mail} alt="" />
                  <Input
                    id="email"
                    type="email"
                    value={emailValue}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 transition-all duration-300 border-none focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div
                  className={`w-full rounded-sm transition-all duration-300 flex items-center border-b-2 ${getInputBorderClass(
                    passwordValue,
                    isPasswordFocused
                  )}`}
                >
                  <img className="w-8 h-6 mr-2" src={Images.lock} alt="" />
                  <Input
                    id="password"
                    type="password"
                    value={passwordValue}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 transition-all duration-300 border-none focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <Button className="my-3 text-white w-full h-12 text-lg bg-main_color hover:bg-[#7848F4]">
                  Login
                </Button>
                <div className="text-center text-sm text-gray-600">
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
                <span className="mx-4 whitespace-nowrap text-sm text-neutral-500">
                  or login with
                </span>
                <hr className="flex-grow h-0.5 bg-neutral-300 border-none" />
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-300 hover:border-neutral-500 transition duration-300">
                  <img className="w-6 h-6" src={Images.google} alt="Google" />
                </button>
                <button className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-300 hover:border-neutral-500 transition duration-300">
                  <img className="w-6 h-6" src={Images.github} alt="GitHub" />
                </button>
                <button className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-300 hover:border-neutral-500 transition duration-300">
                  <img
                    className="w-6 h-6"
                    src={Images.linkedin}
                    alt="LinkedIn"
                  />
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
