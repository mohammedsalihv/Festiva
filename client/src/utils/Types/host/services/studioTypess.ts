export interface studioFormState {
  studioName: string;
  timeSlots: string[];
  availableDates: string[];
  terms: string;
  about: string;
  description: string;
}
export interface studioFormErrorState {
  studioName?: string;
  timeSlots?: string[];
  availableDates?: string[];
  terms?: string;
  about?: string;
  description?: string;
}

export const initialStudioFormState: studioFormState = {
  studioName: "",
  timeSlots: [],
  availableDates: [],
  terms: "",
  about: "",
  description: "",
};

export interface studioPackage {
  packageName: string;
  payment: string;
  packageIncludes: string[];
  manPower: string;
  equipments: string;
  deliveryTime: string;
  validity: string;
}

export interface studioPackageState {
  serviceFeatures: string[];
  packages: studioPackage[];
}

export const initialStudioPackageState: studioPackageState = {
  serviceFeatures: [],
  packages: [],
};
