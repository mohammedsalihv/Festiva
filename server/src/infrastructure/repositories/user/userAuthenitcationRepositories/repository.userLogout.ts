import { IUserLogoutRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userLogoutRepository";
import { TokenBlacklistModel } from "../../../../domain/models/base/baseAuthenticationmodels/tokenBlacklistModel";

export class UserLogoutRepository implements IUserLogoutRepository {
  async blacklistToken(token: string): Promise<void> {
    await TokenBlacklistModel.create({ token });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const exists = await TokenBlacklistModel.findOne({ token });
    return !!exists;
  }
}
