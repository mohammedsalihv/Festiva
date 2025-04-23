import mongoose, { Schema } from "mongoose";
import { Ihost } from "../entities/modelInterface/host.interface";

const HostSchema = new Schema<Ihost>({
    name:{type:String , required:true},
    phone:{type:String , required:true},
    password:{type:String , required:true},
    email:{type:String , required:true},
    profile_pic:{type:String , required:true},
    location:{type:String , required:true},
    isActive: { type: Boolean, default: true },
    is_blocked: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
})

export const HostModel = mongoose.model<Ihost>("Host" , HostSchema)