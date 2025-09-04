import { CreateAssetNotificationDTO } from "../../../../types/DTO/common/notification";
import { INotification } from "../../serviceInterface/base/interface.notification";

export interface INotificationRepository {
  create(data: CreateAssetNotificationDTO): Promise<void>;
  getByReceiver(receiverId: string): Promise<any[]>;
  getAllNotifications(): Promise<INotification[]>;
}
