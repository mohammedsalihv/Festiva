export interface ICatersBase {
  _id: string;
  name: string;
  assetType: "caters";
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
