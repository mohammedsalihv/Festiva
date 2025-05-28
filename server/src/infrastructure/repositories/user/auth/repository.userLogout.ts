import { ILogoutRepository } from "../../../../domain/entities/repositoryInterface/host/interface.logoutRepository";
import { TokenBlacklistModel } from "../../../../domain/models/tokenBlacklistModel";

export class LogoutRepository implements ILogoutRepository {
  async blacklistToken(token: string): Promise<void> {
    await TokenBlacklistModel.create({ token });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const exists = await TokenBlacklistModel.findOne({ token });
    return !!exists;
  }
}
