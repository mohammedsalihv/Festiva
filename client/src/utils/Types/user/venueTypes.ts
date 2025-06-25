export interface IVenueBase {
  _id: string;
  venueName: string;
  typeOfAsset: "venue";
  rent?: number;
  status?: "pending" | "approved" | "rejected";
  location: {
    _id: string;
    city?: string;
    state?: string;
    country?: string;
  };
  Images?: string[];
  [key: string]: any;
}
