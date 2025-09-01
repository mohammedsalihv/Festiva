export interface userMyBookingsResponse {
  _id: string;
  assetName: string;
  assetImage: string;
  assetType: string;
  bookedDate: string | Date;
  bookingStatus: string;
}


export interface userBookingDetailsResponse {
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
