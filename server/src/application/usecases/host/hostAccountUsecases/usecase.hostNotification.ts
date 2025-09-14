import { IHostNotificationUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostAccountUsecaseInterfaces/interface.hostNotificationUseCase";
import { IHostNotificationRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAccountRepositoryInterfaces/interface.hostNotificationRepositoy";
import { CreateAssetNotificationDTO } from "../../../../types/DTO's/baseDTO's/notification";

export class HostNotificationUseCase implements IHostNotificationUseCase {
  constructor(
    private _hostNotificationRepository: IHostNotificationRepository
  ) {}

  async getNotifications(receiverId: string) {
    return await this._hostNotificationRepository.allHostNotifications(
      receiverId
    );
  }
  async createNotification(data: CreateAssetNotificationDTO): Promise<void> {
    await this._hostNotificationRepository.createNotification(data);
  }
  async markAllNotifications(hostId: string): Promise<void> {
    await this._hostNotificationRepository.markAllRead(hostId);
  }
}
