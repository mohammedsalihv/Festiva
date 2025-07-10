import { CreateAssetNotificationDTO } from "../../../../types/DTO/common/notification";

export interface INotificationRepository {
  create(data: CreateAssetNotificationDTO): Promise<void>;
  getByReceiver(receiverId: string): Promise<any[]>;
}
