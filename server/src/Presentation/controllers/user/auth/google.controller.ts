import { Request, Response } from "express";
import { GoogleLogin } from "../../../../application/use-cases/user/Auth/googleLogin";

export class GoogleController {
  constructor(private googleLogin: GoogleLogin) {}
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, sub: googleId } = req.body;
      const { user, accessToken, refreshToken } =
        await this.googleLogin.execute(name, googleId, email);
      res.status(200).json({
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
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
