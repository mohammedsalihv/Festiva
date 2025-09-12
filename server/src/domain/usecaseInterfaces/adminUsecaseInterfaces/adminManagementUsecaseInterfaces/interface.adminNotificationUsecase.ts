import { CreateAssetNotificationDTO } from "../../../../types/DTO's/baseDTO's/notification";

export interface IAdminNotificationUseCase {
  getNotifications(receiverId: string): Promise<any[]>;
  createNotification(data: CreateAssetNotificationDTO): Promise<void>;
  markAllNotifications(hostId: string): Promise<void>;
}
