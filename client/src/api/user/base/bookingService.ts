import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";

export const startBooking = async (data: any) => {
  const response = await axiosInstance.post(
    USER_API.bookingRoutes.createBooking,
    data
  );
  return response.data.data;
};

export const myAllBookings = async (
  page: number,
  limit: number,
  sortBy?: string,
  searchBy?: string,
  tabBy?: string
) => {
  const response = await axiosInstance.get(
    USER_API.bookingRoutes.getMyBookings,
    {
      params: {
        page,
        limit,
        sortBy,
        searchBy,
        tabBy,
      },
    }
  );
  return response.data;
};
