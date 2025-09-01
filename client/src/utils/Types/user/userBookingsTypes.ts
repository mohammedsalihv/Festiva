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

export interface bookingDetails {
  _id: string;
  assetImage: string;
  assetName: string;
  assetType: string;
  bookingStatus: string;
  bookedDate: string | Date;
  bookingRejectedReason?: string;
  bookedData: {
    selectedDates: string | string[];
    selectedTime: string;
    attendeesCount?: number;
    manPower?: number;
    selectedPackageName?: string;
    selectedPackage?: [];
  };
  paymentDetails: {
    paymentStatus: string;
    transactionId: string;
    platformFee: number;
    total: number;
    paymentDate: string | Date;
  };
  hostDetails: {
    hostName: string;
    hostProfilePic: string;
    hostRegisteredTime: string | Date;
  };
}
