import { IAdminLogoutRepository } from "../../../../domain/repositoryInterfaces/adminRepositoryInterfaces/adminAuthenticationRepositoryInterfaces/interface.adminLogout";
import { TokenBlacklistModel } from "../../../../domain/entities/databaseModels/baseModels/baseAuthenticationModels/tokenBlacklistModel";

export class AdminLogoutRepository implements IAdminLogoutRepository {
  async blacklistToken(token: string): Promise<void> {
    await TokenBlacklistModel.create({ token });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const exists = await TokenBlacklistModel.findOne({ token });
    return !!exists;
  }
}
