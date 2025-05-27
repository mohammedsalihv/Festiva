import { Types } from "mongoose";

export interface addVenueDTO {
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
    Images: string[];
    location: Types.ObjectId;
    host: Types.ObjectId;
}
