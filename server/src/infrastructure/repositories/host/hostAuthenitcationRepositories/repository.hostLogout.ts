import { IHostLogoutRepository } from "../../../../domain/entities/repositoryInterface/host/auth repository interface/interface.hostLogoutRepository";
import { TokenBlacklistModel } from "../../../../domain/models/base/baseAuthenticationmodels/tokenBlacklistModel";

export class HostLogoutRepository implements IHostLogoutRepository {
  async blacklistToken(token: string): Promise<void> {
    await TokenBlacklistModel.create({ token });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const exists = await TokenBlacklistModel.findOne({ token });
    return !!exists;
  }
}
