

export interface IRentCarBase {
  _id: string;
  name: string;
  assetType: "rentcar";
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