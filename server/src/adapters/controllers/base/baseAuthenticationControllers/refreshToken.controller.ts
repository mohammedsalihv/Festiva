import { Request, Response } from "express";
import { IRefreshTokenController } from "../../../../domain/controlInterface/common/authentication/interface.refreshTokenController";
import { ITokenService } from "../../../../domain/entities/baseInterface/authenticationInterfaces/interface.tokenService";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class RefreshTokenController implements IRefreshTokenController{
  constructor(private _tokenService: ITokenService) {}
  async refreshAccessToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res
        .status(statusCodes.unAuthorized)
        .json({ message: "Refresh token required" });
      return;
    }

    const user = this._tokenService.verifyRefreshToken(refreshToken);
    if (!user) {
      res
        .status(statusCodes.forbidden)
        .json({ message: "Invalid refresh token" });
      return;
    }

    const newAccessToken = this._tokenService.generateAccessToken({
      id: user.id,
      role: user.role,
    });

    res.status(statusCodes.Success).json({ accessToken: newAccessToken });
  }
}
