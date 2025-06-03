import { useState } from "react";
import { Card, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { toast } from "react-toastify";
import {
  resetPasswordErrorState,
  resetPasswordState
} from "@/utils/Types/user/profileTypes";
import { resetPassword } from "@/api/user/userAuthService";
import { validateResetPasswordForm } from "@/utils/validations/user/Auth/resetPasswordValidation";
import { AxiosError } from "axios";

interface ResetPasswordProps {
  email: string;
  onSuccess: () => void;
  onClose?: () => void;
}

const ResetPassword = ({ email, onSuccess , onClose }: ResetPasswordProps) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<resetPasswordErrorState>({});
  const [resetPasswordForm, setResetPasswordForm] = useState<resetPasswordState>({
    email: email,
    newPassword: "",
    confirmPassword: ""
  });

  const handleResetPassword = async () => {
    const { isValid, errors: validationErrors } =
      validateResetPasswordForm(resetPasswordForm);

    if (!isValid) {
      setErrors(validationErrors);
      toast.error("Please correct the errors in the form.");
      setTimeout(() => setErrors({}), 10000);
      return;
    }

    try {
      setLoading(true);
      await resetPassword(resetPasswordForm);
      toast.success('Password resetted')
      onSuccess();
      
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error("Failed to reset password");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPasswordForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof resetPasswordErrorState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center backdrop-blur-sm bg-black/30 px-4">
      <Card className="bg-white shadow-2xl rounded-lg w-full max-w-xs md:max-w-md">
        <CardContent className="p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
            Reset Password
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mb-4 text-center">
            Enter your new password
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword();
            }}
          >
            <div className="mb-4">
              <Input
                type="password"
                name="newPassword"
                value={resetPasswordForm.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                disabled={loading}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm text-center font-bold py-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Input
                type="password"
                name="confirmPassword"
                value={resetPasswordForm.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm text-center font-bold py-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="h-10 md:h-12 w-full bg-main_color text-white py-2 md:py-3 rounded-lg hover:bg-main_color_dark transition duration-200 mb-2"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
            {onClose && (
              <Button
                type="button"
                className="h-10 md:h-12 w-full bg-gray-200 text-black py-2 md:py-3 rounded-lg hover:bg-gray-300 transition duration-200"
                onClick={onClose}
              >
                Cancel
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      <CustomToastContainer />
    </div>
  );
};

export default ResetPassword;
