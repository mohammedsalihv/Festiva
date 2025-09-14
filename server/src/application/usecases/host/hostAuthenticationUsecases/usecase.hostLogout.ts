import { IHostLogoutRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAuthenticationRepositoryInterfaces/interface.hostLogoutRepository";
import { IHostLogoutUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostAuthenticationUsecaseInterfaces/interface.hostLogoutUseCase";

export class HostLogoutUseCase implements IHostLogoutUseCase {
  constructor(private _hostLogoutRepository: IHostLogoutRepository) {}

  async logout(token: string): Promise<void> {
    await this._hostLogoutRepository.blacklistToken(token);
  }
}
