import { ILogoutRepository } from "../../../../domain/entities/repositoryInterface/host/interface.logoutRepository";

export class LogoutUser {
  constructor(private logoutRepository: ILogoutRepository) {}

  async execute(token: string): Promise<void> {
    await this.logoutRepository.blacklistToken(token);
  }
}
