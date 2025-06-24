import { IUserLogoutRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userLogoutRepository";

export class UserLogoutUseCase {
  constructor(private UserLogoutRepository: IUserLogoutRepository) {}

  async execute(token: string): Promise<void> {
    await this.UserLogoutRepository.blacklistToken(token);
  }
}
