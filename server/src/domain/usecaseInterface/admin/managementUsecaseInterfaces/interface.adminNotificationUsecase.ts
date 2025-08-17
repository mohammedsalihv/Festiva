import { CreateAssetNotificationDTO } from "../../../../types/DTO/common/notification";

export interface IAdminNotificationUseCase {
  getNotifications(receiverId: string): Promise<any[]>;
  createNotification(data: CreateAssetNotificationDTO): Promise<void>;
  markAllNotifications(hostId: string): Promise<void>;
}
