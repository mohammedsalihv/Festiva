import { AssetType } from "../services/common/commonTypes";
import { IAsset } from "../services/common/commonTypes";


export interface receivedBookings {
  _id: string;
  bookedUser: string;
  bookedData: IAsset;
  assetId: string;
  assetType: AssetType;
  selectedDates: string[];
  selectedTimeSlot?: string;
  total: number;
  transactionId: string;
  paymentId: string;
  status: string;
  createdAt: string;
}

export interface ReceivedBookingsState {
  bookings: receivedBookings[];
}
