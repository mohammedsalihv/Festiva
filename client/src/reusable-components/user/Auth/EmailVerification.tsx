import { Card, CardContent } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { useState } from "react";

interface EmailVerificationProps {
  handleSubmit: (email: string) => void;
  loading?: boolean;
  errorMessage?: string;
  onClose?: () => void;
}

const EmailVerification = ({
  loading = false,
  errorMessage = "",
  onClose,
  handleSubmit,
}: EmailVerificationProps) => {
  const [email, setEmail] = useState("");
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(email);
  };

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
            Enter email
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mb-4 text-center">
            Please enter registered email
          </p>
          <form onSubmit={onFormSubmit}>
            <div className="flex justify-center space-x-2 md:space-x-4 mb-4">
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 md:w-full md:h-12 text-medium md:text-medium  border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-main_color"
                placeholder="Enter email"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="h-10  md:h-12 w-full bg-main_color text-white py-2 md:py-5 rounded-lg hover:bg-main_color_dark transition duration-200 mb-2"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify email"}
            </Button>
            {onClose && (
              <Button
                type="button"
                className="w-full bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300"
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

export default EmailVerification;
