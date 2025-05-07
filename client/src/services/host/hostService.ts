import axiosInstance from "@/config/host/hostAddServiceAxiosInstence";

export interface AddVenueData {
  venueName?: string;
  rent?: number | null;
  capacity?: number | null;
  shift?: string;
  squareFeet?: number | null;
  timeSlots?: string[];
  availableDates?: string[];
  details?: string;
  features: string[];
  parkingFeatures: string[];
  venueDescription: string;
  terms: string;
  venueImages: string[];
  location: object;
}


export const addVenue = async (data: AddVenueData) => {
  const response = await axiosInstance.post("/addVenue", data);
  console.log(response);
  return response.data;
};
