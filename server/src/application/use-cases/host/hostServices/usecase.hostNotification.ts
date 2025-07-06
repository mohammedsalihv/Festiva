import { IHostNotificationUseCase } from '../../../../domain/usecaseInterface/host/interface.hostNotificationUseCase';
import { CreateAssetNotificationDTO } from '../../../../types/DTO/common/notification';
import { INotificationRepository } from '../../../../domain/entities/repositoryInterface/Base interfaces/interface.notificationRepository';

export class HostNotificationUseCase implements IHostNotificationUseCase {
  constructor(private notificationRepo: INotificationRepository) {}

  async createNotification(data: CreateAssetNotificationDTO): Promise<void> {
    await this.notificationRepo.create(data);
  }

  async getNotificationsByUser(userId: string): Promise<any[]> {
    return await this.notificationRepo.getByReceiver(userId);
  }
}
