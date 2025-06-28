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



