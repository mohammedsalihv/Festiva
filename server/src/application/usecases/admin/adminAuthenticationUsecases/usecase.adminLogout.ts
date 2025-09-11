import { IAdminLogoutRepository } from "../../../../domain/entities/repositoryInterface/admin/authentication/interface.adminLogout";
import { IAdminLogoutUseCase } from "../../../../domain/usecaseInterface/admin/authenticationUsecaseInterfaces/interface.adminLogoutUseCase";

export class AdminLogoutUseCase implements IAdminLogoutUseCase {
  constructor(private _adminLogoutRepository: IAdminLogoutRepository) {}

  async adminLogout(token: string): Promise<void> {
    await this._adminLogoutRepository.blacklistToken(token);
  }
}
