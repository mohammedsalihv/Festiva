export interface myAssetsCard {
  assetName: string;
  assetType: "studio" | "venue" | "rentcar" | "caters";
  assetId: string;
  assetImage: string;
  listedDate: Date;
  status: "approved" | "rejected" | "pending";
}
