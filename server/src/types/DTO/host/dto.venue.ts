import { Types } from "mongoose";


export interface addVenueDTO {
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
    Images: string[];
    status?:string
    location: Types.ObjectId;
    host: Types.ObjectId;
}


export interface responseVenueDTO {
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
    location?: string[];
    host?: Types.ObjectId;
}
