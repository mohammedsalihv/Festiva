import { packageState} from "./packageForm.types";

export interface studioDetailsFormState {
  packages: packageState[];
  serviceFeatures: string[];
}

export interface studioDetailsFormErrorState {
  packages: string;          
  serviceFeatures: string; 
}


export const initialStudioDetailsFormState: studioDetailsFormState = {
  packages: [],
  serviceFeatures: [],
};

export const initialStudioDetailsFormErrorState: studioDetailsFormErrorState = {
  packages: "",
  serviceFeatures: "",
};

