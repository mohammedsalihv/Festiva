import axiosInstance from "@/config/admin/adminAxiosInstence";
import { ADMIN_API } from "@/utils/constants/api endpoints/admin.api";

export const createdBookings = async (
  page: number,
  limit: number,
  sortBy?: string,
  searchBy?: string,
  tabBy?: string
) => {
  const response = await axiosInstance.get(
    ADMIN_API.bookingManagement.getBookings,
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
