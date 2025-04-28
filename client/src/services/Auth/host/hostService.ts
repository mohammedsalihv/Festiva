import axiosInstance from "@/config/hostAddServiceAxiosInstence";
import { Types } from "mongoose";

export interface AddVenueData {
  venueName?: string;
  rent?: number;
  capacity?: number;
  shift?: string;
  squareFeet?: number;
  timeSlots?: string[];
  availableDates?: string[];
  details?: string;
  features: string[];
  parkingFeatures: string[];
  venueDescription: string;
  terms: string;
  venueImages: string[];
  location: Types.ObjectId;
}

export const addVenue = async (data: AddVenueData) => {
  const response = await axiosInstance.post("/services/addVenue", data);
  console.log(response);
  return response.data;
};
