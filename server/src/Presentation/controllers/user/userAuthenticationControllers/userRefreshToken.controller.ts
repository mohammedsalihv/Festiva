import { Request, Response } from "express";
import { TokenService } from "../../../../application/tokenService/service.token";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class RefreshTokenController {
  constructor(private tokenService: TokenService) {}
  async refreshAccessToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res
        .status(statusCodes.unAuthorized)
        .json({ message: "Refresh token required" });
      return;
    }

    const user = this.tokenService.verifyRefreshToken(refreshToken);
    if (!user) {
      res
        .status(statusCodes.forbidden)
        .json({ message: "Invalid refresh token" });
      return;
    }

    const newAccessToken = this.tokenService.generateAccessToken({
      id: user.id,
      role: user.role,
    });

    res.status(statusCodes.Success).json({ accessToken: newAccessToken });
  }
}
