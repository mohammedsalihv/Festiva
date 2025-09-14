import { IUserLogoutRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userAuthenticationRepositoryInterfaces/interface.userLogoutRepository";
import { IUserLogoutUseCase } from "../../../../domain/usecaseInterfaces/userUsecaseInterfaces/userAuthenticationUseCaseInterfaces/interface.userLogoutUseCase";

export class UserLogoutUseCase implements IUserLogoutUseCase {
  constructor(private _userLogoutRepository: IUserLogoutRepository) {}

  async logout(token: string): Promise<void> {
    await this._userLogoutRepository.blacklistToken(token);
  }
}
