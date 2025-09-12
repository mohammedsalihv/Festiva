import { CreateAssetNotificationDTO } from "../../../../types/DTO's/baseDTO's/notification";

export interface IHostNotificationUseCase {
  getNotifications(receiverId: string): Promise<any[]>;
  createNotification(data: CreateAssetNotificationDTO): Promise<void>;
  markAllNotifications(hostId: string): Promise<void>;
}
