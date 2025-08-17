import { IVenue } from "../../../domain/entities/serviceInterface/host/interface.venue";
import { ICaters } from "../../../domain/entities/serviceInterface/host/interface.caters";
import { IStudio } from "../../../domain/entities/serviceInterface/host/interface.studio";
import { IRentCar } from "../../../domain/entities/serviceInterface/host/interface.rentCar";

export type IAsset =
  | (IVenue & { typeOfAsset: "venue" })
  | (IRentCar & { typeOfAsset: "rentcar" })
  | (ICaters & { typeOfAsset: "caters" })
  | (IStudio & { typeOfAsset: "studio" });
export type AssetType = "venue" | "rentcar" | "caters" | "studio";
