export interface IRentCarBase {
  _id: string;
  name: string;
  assetType: "rentcar";
  amount?: string;
  status?: "pending" | "approved" | "rejected";
  location: {
    _id: string;
    city?: string;
    state?: string;
    country?: string;
  };
  Images?: string[];
  [key: string]: unknown;
}
