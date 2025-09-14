import { IUserLogoutRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userAuthenticationRepositoryInterfaces/interface.userLogoutRepository";
import { TokenBlacklistModel } from "../../../../domain/entities/databaseModels/baseModels/baseAuthenticationModels/tokenBlacklistModel";

export class UserLogoutRepository implements IUserLogoutRepository {
  async blacklistToken(token: string): Promise<void> {
    await TokenBlacklistModel.create({ token });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const exists = await TokenBlacklistModel.findOne({ token });
    return !!exists;
  }
}
