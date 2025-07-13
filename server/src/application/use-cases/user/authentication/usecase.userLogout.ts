import { IUserLogoutRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userLogoutRepository";
import { IUserLogoutUseCase } from "../../../../domain/usecaseInterface/user/auth/interface.userLogoutUseCase";

export class UserLogoutUseCase implements IUserLogoutUseCase {
  constructor(private userLogoutRepository: IUserLogoutRepository) {}

  async logout(token: string): Promise<void> {
    await this.userLogoutRepository.blacklistToken(token);
  }
}
