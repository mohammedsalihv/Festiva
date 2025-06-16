import { Types } from "mongoose";

export interface IVenue {
    venueName?: string;
    rent?: number;
    capacity?: number;
    shift?: string;
    squareFeet?: number;
    timeSlots?: string[];
    availableDates?: string[];
    about?: string;
    features: string[];
    parkingFeatures: string[];
    description: string;
    terms: string;
    Images?: string[];
    status?:string;
    typeOfAsset?:string;
    location: Types.ObjectId;
    host: Types.ObjectId;
}
