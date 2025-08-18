import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";

interface CreatePaymentParams {
  amount: number;
  currency: string;
}

export const createPayment = async ({ amount, currency }: CreatePaymentParams) => {
  const response = await axiosInstance.post(
    USER_API.paymentRoutes.startPayment,
    { amount, currency }
  );
  return response.data;
};
