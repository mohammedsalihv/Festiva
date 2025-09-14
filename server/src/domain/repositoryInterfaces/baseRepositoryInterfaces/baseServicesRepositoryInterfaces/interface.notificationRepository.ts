import { CreateAssetNotificationDTO } from "../../../../types/DTO's/baseDTO's/notification";
import { INotification } from "../../../baseInterfaces/baseServicesInterfaces/interface.notification";

export interface INotificationRepository {
  create(data: CreateAssetNotificationDTO): Promise<void>;
  getByReceiver(receiverId: string): Promise<any[]>;
  getAllNotifications(): Promise<INotification[]>;
}
