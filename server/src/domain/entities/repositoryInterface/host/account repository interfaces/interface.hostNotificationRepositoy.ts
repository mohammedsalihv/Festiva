import { CreateAssetNotificationDTO } from "../../../../../types/DTO/common/notification";

export interface IHostNotificationRepository {
  allHostNotifications(receiverId: string): Promise<any[]>;
  createNotification(data: CreateAssetNotificationDTO): Promise<void>;
}
