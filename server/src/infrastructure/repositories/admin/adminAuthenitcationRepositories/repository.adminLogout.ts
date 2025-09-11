import { IAdminLogoutRepository } from "../../../../domain/entities/repositoryInterface/admin/authentication/interface.adminLogout";
import { TokenBlacklistModel } from "../../../../domain/models/base/baseAuthenticationmodels/tokenBlacklistModel";

export class AdminLogoutRepository implements IAdminLogoutRepository {
  async blacklistToken(token: string): Promise<void> {
    await TokenBlacklistModel.create({ token });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const exists = await TokenBlacklistModel.findOne({ token });
    return !!exists;
  }
}
