export interface IAdminAssetBaseRepositoryDTO {
  _id: string;
  name: string;
  type: "venue" | "car" | "studio" | "cater";
  rent?: number;
  status?: "pending" | "approved" | "rejected";
  host: {
    _id: string;
    name: string;
    email: string;
  };
  location: {
    _id: string;
    city?: string;
    state?: string;
  };
  thumbnail?: string;
  [key: string]: any;
}
