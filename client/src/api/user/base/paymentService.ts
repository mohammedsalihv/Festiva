import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";
import { paymentPayload } from "@/utils/Types/base/payment";

export const createPayment = async (data: paymentPayload) => {
  const response = await axiosInstance.post(
    USER_API.paymentRoutes.startPayment,
    data
  );
  return response.data;
};

export const paymentUpdate = async (status: string, paymentId: string) => {
  const response = await axiosInstance.put(
    USER_API.paymentRoutes.paymentStatus,
    { status, paymentId }
  );
  return response.data;
};

