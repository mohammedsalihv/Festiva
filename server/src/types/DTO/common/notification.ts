 export interface CreateAssetNotificationDTO {
  receiverId: string;
  assetId: string;
  assetType: 'venue' | 'rentcar' | 'studio' | 'caters';
  status: 'approved' | 'rejected';
  message: string;
}
