import { Card, CardContent } from "@/components/Card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { useState } from "react";

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full h-screen grid grid-cols-1 md:grid-cols-[40%_60%] overflow-hidden">
        <div className="flex items-center justify-center bg-main_color w-full h-full px-4 py-6 sm:px-8 sm:py-12">
          <div className="text-white text-center">
            <p className="text-start text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Explore limitless
            </p>
            <p className="text-start text-3xl sm:text-4xl md:text-5xl font-extrabold">
              service possibilities.
            </p>
            <p className="text-start  font-extrabold bg-gradient-to-r from-yellow-600 via-green-100 to-cyan-300 bg-clip-text text-transparent text-sm sm:text-1xl md:text-2xl">
              Start exploring
            </p>
          </div>
        </div>
        <Card className="bg-white flex items-center justify-center w-full max-w-4xl">
          <div className="w-full max-w-4xl bg-white p-6 sm:p-8">
            <CardContent className="space-y-6">
              <div className="text-center space-y-2 p-3">
                <h1 className="text-3xl font-bold text-charcoal">Signup</h1>
                <p className="text-neutral-400">
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
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastname" className="text-sm font-medium">
                    Lastname
                  </Label>
                  <Input
                    id="lastname"
                    type="text"
                    className="w-full border-b-2 border-neutral-600 focus:border-main_color hover:border-white/40 transition-all duration-300"
                  />
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
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    className="w-full border-b-2 border-neutral-600 focus:border-main_color hover:border-white/40 transition-all duration-300"
                  />
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
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="w-full border-b-2 border-neutral-600 focus:border-main_color hover:border-white/40 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between w-full space-x-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      setIsChecked(checked === true)
                    }
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-semibold sm:text-base md:text-1xl text-neutral-400 cursor-pointer"
                  >
                    I agree to the{" "}
                    <span className="text-main_color hover:underline sm:text-base md:text-1xl">
                      terms and conditions
                    </span>
                  </label>
                </div>
                <div className="flex items-center justify-center w-full sm:w-auto bg-main_color max-w-md rounded-md h-12 mt-4 sm:mt-0 sm:ml-4">
                  <Button className="text-white w-full sm:w-48">Sign up</Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default Signup;
