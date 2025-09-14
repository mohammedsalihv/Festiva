import { IHostLogoutRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAuthenticationRepositoryInterfaces/interface.hostLogoutRepository";
import { TokenBlacklistModel } from "../../../../domain/entities/databaseModels/baseModels/baseAuthenticationModels/tokenBlacklistModel";

export class HostLogoutRepository implements IHostLogoutRepository {
  async blacklistToken(token: string): Promise<void> {
    await TokenBlacklistModel.create({ token });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const exists = await TokenBlacklistModel.findOne({ token });
    return !!exists;
  }
}
