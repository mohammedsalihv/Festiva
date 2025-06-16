import { Request, Response } from "express";
import { UserGoogleLoginUseCase } from "../../../../application/use-cases/user/userAuthentication/usecase.userGoogleLogin";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class UserGoogleLoginController {
  constructor(private userGoogleLoginUseCase: UserGoogleLoginUseCase) {}
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, sub: googleId } = req.body;
      const { user, accessToken, refreshToken } =
        await this.userGoogleLoginUseCase.execute(name, googleId, email);
      res.status(statusCodes.Success).json({
        success: true,
        message: "Google login successful",
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic,
          isBlocked: user.isBlocked,
          isActive: user.isActive,
          timestamp:
            user.timestamp instanceof Date
              ? user.timestamp.toISOString()
              : user.timestamp,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      console.error(error);
      res.status(statusCodes.serverError).json({ message: error.message });
    }
  }
}
