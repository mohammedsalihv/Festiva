import { IAdminLogoutRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminAuthenticationRepositoryInterfaces/interface.adminLogout";
import { IAdminLogoutUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminAuthenticationUsecaseInterfaces/interface.adminLogoutUseCase";

export class AdminLogoutUseCase implements IAdminLogoutUseCase {
  constructor(private _adminLogoutRepository: IAdminLogoutRepository) {}

  async adminLogout(token: string): Promise<void> {
    await this._adminLogoutRepository.blacklistToken(token);
  }
}
