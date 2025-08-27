import { AssetType } from "../services/common/commonTypes";
import { IAsset } from "../services/common/commonTypes";

export interface bookedAsset {
  bookedData: IAsset;
}

export interface receivedBookings {
  id: string;
  bookedUser: string;
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

export interface BookingsState {
  bookings: receivedBookings[];
  loading: boolean;
  error: string | null;
}
