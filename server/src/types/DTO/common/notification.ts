 export interface CreateAssetNotificationDTO {
  createrId:string
  receiverId: string;
  assetId: string;
  assetType: 'venue' | 'rentcar' | 'studio' | 'caters';
  status: 'approved' | 'rejected';
  message: string;
}
