import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";
import { serviceRatingPayload } from "@/utils/Types/base/review";


export const rateService = async (data: serviceRatingPayload) => {
  const response = await axiosInstance.post(
    USER_API.reviewRoutes.Rating,
    data
  );
  return response.data.data;
};
