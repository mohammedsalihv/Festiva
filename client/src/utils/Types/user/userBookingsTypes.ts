export interface myBookings {
  _id: string;
  assetName: string;
  assetImage: string;
  assetType: string;
  bookedDate: string | Date;
  bookingStatus: string;
}

export interface myBookingsState {
  bookings: myBookings[];
}

export type bookingSortOptions =
  | "asc"
  | "desc"
  | "completed"
  | "upcoming"
  | "cancelled";
