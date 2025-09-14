import jwt from "jsonwebtoken";
import logger from "../../utils/baseUtilities/messages/logger";
import { ITokenService } from "../../domain/baseInterfaces/baseAuthenticationInterfaces/interface.tokenService";

export class TokenService implements ITokenService {
  constructor(
    private accessSecret: string = process.env.ACCESS_TOKEN_SECRET as string,
    private refreshSecret: string = process.env.REFRESH_TOKEN_SECRET as string
  ) {}

  generateAccessToken(payload: { id: string; role?: string }): string {
    return jwt.sign(payload, this.accessSecret, { expiresIn: "50m" });
  }

  generateRefreshToken(payload: { id: string; role?: string }): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: "7d" });
  }

  verifyRefreshToken(token: string): { id: string; role?: string } | null {
    try {
      return jwt.verify(token, this.refreshSecret) as {
        id: string;
        role?: string;
      };
    } catch (error) {
      logger.info(error);
      return null;
    }
  }
}
