export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}
export interface bookingState {
  time: string;
  date: string;
  attendees?: number;
  manpowerCount?: number
}

export interface bookingErrorState {
  time: string;
  date: string;
  attendees?: number;
  manpowerCount?: number;
}

export interface initialBookingErrorState {
  time: "";
  date: "";
  attendees: 0;
  manpowerCount?: 0
}

export const validateBooking = (
  state: bookingState
): { isValid: boolean; errors: bookingErrorState } => {
  const errors: bookingErrorState = {
    time: "",
    date: "",
    attendees: 0,
    manpowerCount: 0
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
