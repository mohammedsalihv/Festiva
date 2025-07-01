export interface IStudioBase {
  _id: string;
  packagesCount: number;
  name: string;
  amount:string;
  assetType: "studio";
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