import { CreateAssetNotificationDTO } from "../../../types/DTO/common/notification";

export interface IHostNotificationUseCase {
  createNotification(data: CreateAssetNotificationDTO): Promise<void>;
  getNotificationsByUser(hostId: string): Promise<any[]>;
}
