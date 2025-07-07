export interface AssetRequestDTO {
  id: string; // request ID
  assetId: string;
  assetType: "studio" | "venue" | "rentcar" | "caters";
  name: string;
  image: string;
  reqDate: string; 
  actionDate: string | null; 
  status: "Approved" | "Rejected" | "Pending";
}
