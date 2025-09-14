import { CreateAssetNotificationDTO } from "../../../../types/DTO's/baseDTO's/notification";

export interface IHostNotificationRepository {
  allHostNotifications(receiverId: string): Promise<any[]>;
  createNotification(data: CreateAssetNotificationDTO): Promise<void>;
  markAllRead(hostId: string): Promise<void>;
}
