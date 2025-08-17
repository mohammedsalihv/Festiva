import { IUserLogoutRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userLogoutRepository";
import { IUserLogoutUseCase } from "../../../../domain/usecaseInterface/user/userAuthenticationUseCaseInterfaces/interface.userLogoutUseCase";

export class UserLogoutUseCase implements IUserLogoutUseCase {
  constructor(private _userLogoutRepository: IUserLogoutRepository) {}

  async logout(token: string): Promise<void> {
    await this._userLogoutRepository.blacklistToken(token);
  }
}
