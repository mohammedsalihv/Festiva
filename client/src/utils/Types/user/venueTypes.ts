export interface IVenueBase {
  _id: string;
  name: string;
  assetType: "venue";
  amount: string;
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
