import { Types } from "mongoose";

export interface IVenue {
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
    status?:string;
    location: Types.ObjectId;
    host: Types.ObjectId;
}
