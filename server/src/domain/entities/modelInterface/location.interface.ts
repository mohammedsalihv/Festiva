import { Types } from "mongoose";

export interface ILocation {
    _id?: Types.ObjectId; 
    houseNo?: string;
    street?: string;
    district?: string;
    state?: string;
    country?: string;
    zip?: string;
}
