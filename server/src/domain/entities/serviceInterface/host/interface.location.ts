import { Types } from "mongoose";

export interface ILocation {
  _id?: string;
  houseNo?: string;
  street?: string;
  district?: string;
  state?: string;
  country?: string;
  zip?: string;
  coordinates: {
    type: "Point";
    coordinates: [number, number];
  };
  createdAt?: Date;
  updatedAt?: Date;
}
