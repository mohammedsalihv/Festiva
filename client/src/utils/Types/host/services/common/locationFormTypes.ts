export interface locationFormState {
  houseNo: string;
  street: string;
  district: string;
  state: string;
  country: string;
  zip: string;
}

export interface locationFormErrorState {
  houseNo?: string;
  street?: string;
  district?: string;
  state?: string;
  country?: string;
  zip?: string;
}

export const locationFormInitialState: locationFormState = {
  houseNo: "",
  street: "",
  district: "",
  state: "",
  country: "",
  zip: "",
};