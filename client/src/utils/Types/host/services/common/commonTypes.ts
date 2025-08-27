import { venueFormState, venueDetailsFormState } from "../venueTypes";
import {
  rentCarFormState,
  rentCarDetailsFormState,
} from "@/utils/validations/host/service/rentCarFormValidation";
import { catersFormState, catersDetailsFormState } from "../catersTypes";
import { studioFormState } from "../studio/studioForm.types";
import { studioDetailsFormState } from "../studio/studioDetailsForm.types";
import { IStudio } from "../studio/studioTypes";
import { ICaters } from "../catersTypes";
import { IVenue } from "../venueTypes";
import { IRentCar } from "../rentcarTypes";

export interface LocationDetails {
  houseNo: string;
  street: string;
  district: string;
  state: string;
  country: string;
  zip: string;
}

export interface ImageDetails {
  Images: File[];
}

export type ServiceFormUnion =
  | { form: venueFormState; details: venueDetailsFormState }
  | { form: rentCarFormState; details: rentCarDetailsFormState }
  | { form: catersFormState; details: catersDetailsFormState }
  | { form: studioFormState; details: studioDetailsFormState };

export type AssetType = "venue" | "rentcar" | "caters" | "studio";
export type IAsset =
  | (IVenue & { typeOfAsset: "venue" })
  | (IRentCar & { typeOfAsset: "rentcar" })
  | (ICaters & { typeOfAsset: "caters" })
  | (IStudio & { typeOfAsset: "studio" });
