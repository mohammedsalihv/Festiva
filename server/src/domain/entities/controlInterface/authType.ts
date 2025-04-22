import { Request } from "express";

export interface AuthRequest extends Request{
    user?:{
        id:string,
        role:string
    }
}

export interface JwtPayload {
    id: string;
    role: string;
  }