import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Images } from "@/assets";

const Otp = () => {
  const handleSubmit = () => {
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4"> 
      <Card className="bg-white shadow-2xl rounded-lg w-full max-w-xs md:max-w-md">
        <CardContent className="p-6 md:p-10">
          <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-center">Enter OTP</h2>
            <img className="w-5 h-5 md:w-6 md:h-5" src={Images.security} alt="Security" />
          </div>
          <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6 text-center">
            We have sent a One-Time Password (OTP) to your registered
            email/phone. Please enter it below.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-2 md:space-x-4 mb-4 md:mb-6"> 
              {[...Array(6)].map((_, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-10 h-10 md:w-12 md:h-12 text-lg md:text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              ))}
            </div>
            <Button
              type="submit"
              className="h-10 md:h-12 w-full border border-black text-black py-2 md:py-3 rounded-lg hover:bg-charcoal hover:text-white transition duration-200"
            >
              Verify OTP
            </Button>
          </form>
          <p className="text-xs md:text-sm text-gray-600 mt-4 md:mt-6 text-center">
            Didn't receive the OTP?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Resend OTP
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Otp;