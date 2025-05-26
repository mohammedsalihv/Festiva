import mongoose , {Schema , model} from "mongoose";
import { ILocation } from "../entities/serviceInterface/interface.location";


const locationSchema = new Schema<ILocation>({
    houseNo: { type: String },
    street: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },
    zip: { type: String }
},{
    timestamps:true
})

export const LocationModel = model<ILocation>("Location", locationSchema);