export interface adminBookingsState {
  _id: string;
  assetName: string;
  assetImage: string;
  assetType: string;
  Date: string | string[];
  timeSlot: string;
  bookedUserName: string;
  bookedUserEmail: string;
  bookedDate: string;
  status: string;
  hostName: string;
  hostEmail: string;
}

export interface allBookingsState {
  bookings: adminBookingsState[];
}
