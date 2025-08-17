import { IHostLogoutRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostLogoutRepository";
import { IHostLogoutUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostLogoutUseCase";

export class HostLogoutUseCase implements IHostLogoutUseCase {
  constructor(private _hostLogoutRepository: IHostLogoutRepository) {}

  async logout(token: string): Promise<void> {
    await this._hostLogoutRepository.blacklistToken(token);
  }
}
