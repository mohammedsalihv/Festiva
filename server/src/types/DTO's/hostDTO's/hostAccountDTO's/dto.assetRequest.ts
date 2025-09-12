export interface AssetRequestDTO {
  id: string;
  assetId: string;
  assetType: "studio" | "venue" | "rentcar" | "caters";
  name: string;
  image: string;
  reqDate: string;
  actionDate: string | null;
  status: "Approved" | "Rejected" | "Pending";
}

export interface myAssetsDTO {
  assetName: string;
  assetType: "studio" | "venue" | "rentcar" | "caters";
  assetId: string;
  assetImage: string;
  listedDate: Date;
  status: "Approved" | "Rejected" | "Pending";
}
