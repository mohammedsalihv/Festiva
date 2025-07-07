import { CreateAssetNotificationDTO } from "../../../../types/DTO/common/notification";

export interface IHostNotificationUseCase {
  getNotifications(receiverId: string): Promise<any[]>; 
  createNotification(data: CreateAssetNotificationDTO): Promise<void>;
}
