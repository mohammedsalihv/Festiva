import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { GoogleLogin } from "../../../../application/use-cases/user/Auth/googleLogin";
import logger from "../../../../utils/logger";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export class GoogleController {
  constructor(private googleLogin: GoogleLogin) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.body;
      if (!code) {
        logger.warn("Authorization code missing in request");
        res.status(400).json({ message: "Authorization code is required" });
        return;
      }

      logger.info("Exchanging code for tokens...");
      const { tokens } = await oauth2Client.getToken(code);
      logger.info("Tokens received:", tokens);
      oauth2Client.setCredentials(tokens);

      logger.info("Verifying ID token...");
      const ticket = await oauth2Client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      logger.info("Token payload:", payload);

      if (!payload || !payload.email || !payload.sub || !payload.name) {
        logger.warn("Invalid token payload:", payload);
        res.status(400).json({ message: "Invalid Google token payload" });
        return;
      }

      logger.info("Executing GoogleLogin use case...");
      const { user, accessToken, refreshToken } = await this.googleLogin.execute(
        payload.name,
        payload.sub,
        payload.email
      );
      logger.info("GoogleLogin.execute result:", { user, accessToken, refreshToken });

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
          timestamp: user.timestamp instanceof Date ? user.timestamp.toISOString() : user.timestamp,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error("Error in Google login:", error);
      res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
  }
}