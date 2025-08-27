export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}
export interface bookingState {
  time: string;
  date: string;
  attendees?: string;
  manpowerCount?: string
}

export interface bookingErrorState {
  time: string;
  date: string;
  attendees?: string;
  manpowerCount?: string;
}

export interface initialBookingErrorState {
  time: "";
  date: "";
  attendees: "";
  manpowerCount?: ""
}

export const validateBooking = (
  state: bookingState
): { isValid: boolean; errors: bookingErrorState } => {
  const errors: bookingErrorState = {
    time: "",
    date: "",
    attendees: "",
    manpowerCount: ""
  };

  if (!state.time.trim()) {
    errors.time = "Please select a time";
  }

  if (!state.date.trim()) {
    errors.date = "Please select a date";
  }


  return {
    isValid: !errors.time && !errors.date && !errors.attendees,
    errors,
  };
};
