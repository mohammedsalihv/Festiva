import { IVenue } from "../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.venue";
import { ICaters } from "../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.caters";
import { IStudio } from "../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.studio";
import { IRentCar } from "../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.rentCar";

export type IAsset =
  | (IVenue & { typeOfAsset: "venue" })
  | (IRentCar & { typeOfAsset: "rentcar" })
  | (ICaters & { typeOfAsset: "caters" })
  | (IStudio & { typeOfAsset: "studio" });
export type AssetType = "venue" | "rentcar" | "caters" | "studio";
