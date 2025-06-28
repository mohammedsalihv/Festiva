import { venueFormState, venueDetailsFormState } from "../venueTypes";
import {
  rentCarFormState,
  rentCarDetailsFormState,
} from "@/utils/validations/host/service/rentCarFormValidation";
import { catersFormState, catersDetailsFormState } from "../catersTypes";
import { studioFormState } from "../studio/studioForm.types";
import { studioDetailsFormState } from "../studio/studioDetailsForm.types";

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
