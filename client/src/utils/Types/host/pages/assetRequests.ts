export type RequestStatus = "approved" | "rejected" | "pending";

export interface AssetRequest {
  id: string;
  assetId: string;
  assetType: "studio" | "venue" | "rentcar" | "caters";
  name: string;
  image: string;
  reqDate: string;
  actionDate: string | null;
  status: RequestStatus;
}
