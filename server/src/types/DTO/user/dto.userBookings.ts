export interface userMyBookingsResponse {
  _id: string;
  assetName: string;
  assetImage: string;
  assetType: string;
  bookedDate: string | Date;
  bookingStatus: string;
}
