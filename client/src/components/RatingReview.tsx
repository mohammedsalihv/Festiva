import { useEffect, useState } from "react";
import { Star, Gift } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "./Button";
import { Textarea } from "./Textarea";
import { USER_ROUTE } from "@/utils/constants/routes/user.routes";
import { useNavigate } from "react-router-dom";
import { rateService } from "@/api/user/base/reviewServices";
import { serviceRatingPayload } from "@/utils/Types/base/review";

const RatingReview = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const navigate = useNavigate();
  const bookedAsset = useSelector(
    (state: RootState) => state.booking.currentBooking
  );
  const user = useSelector((state: RootState) => state.user.userInfo);

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a star rating!");
      return;
    }

    if (!bookedAsset?.assetId || !user?.id) {
      setError("Missing booking or user info!");
      return;
    }

    const payload: serviceRatingPayload = {
      stars: rating,
      comment,
      assetId: bookedAsset?.assetId,
      reviewer: user?.id,
    };

    try {
      const response = await rateService(payload);
      if (response) {
        setShowSuccess(true);
      }
    } catch (error) {
      setShowSuccess(false);
      console.error("Failed to submit review:", error);
      setError("Something went wrong. Please try again!");
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate(USER_ROUTE.userRedirectLinks.toUserHome);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showSuccess, navigate]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/10">
      <div
        className={`bg-white rounded-lg max-w-md md:max-w-2xl w-full p-6 md:p-8 transform transition-transform duration-700 ${
          showSuccess ? "rotate-y-180" : ""
        }`}
        style={{ perspective: "1000px" }}
      >
        {!showSuccess ? (
          <>
            <h2 className="text-2xl font-bold mb-2">Rate your booking</h2>
            <p className="text-gray-500 text-sm md:text-base mb-4 font-JosephicSans">
              Your feedback helps us improve our services and provide you with a
              better booking experience.
            </p>

            <h3 className="text-gray-800 font-medium mb-2">
              How would you rate this booking service?
            </h3>
            <div className="flex justify-center gap-2 mb-4">
              {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                return (
                  <Button
                    key={starValue}
                    type="button"
                    onClick={() => {
                      setRating((prev) => (prev === starValue ? 0 : starValue))
                    }}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    className="focus:outline-none shadow-none"
                  >
                    <Star
                      size={40}
                      className={`transition-colors ${
                        starValue <= (hover || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-300"
                      }`}
                    />
                  </Button>
                );
              })}
            </div>

            <Textarea
              className="w-full sm:h-40 h-20 border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="flex justify-end gap-3">
              <Button
                onClick={() => navigate(USER_ROUTE.userRedirectLinks.toUserHome)}
                className="px-4 py-2 border  text-gray-700 transition rounded-md shadow-none border-none text-md font-poppins"
              >
                Skip
              </Button>

              <Button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md bg-main_gradient text-white transition text-md font-poppins"
              >
                Submit
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <Gift size={60} className="text-green-500" />
            <h2 className="text-2xl font-bold">Thanks for your feedback!</h2>
            <p className="text-gray-500 text-sm">
              Redirecting you to home in {countdown} sec...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingReview;
