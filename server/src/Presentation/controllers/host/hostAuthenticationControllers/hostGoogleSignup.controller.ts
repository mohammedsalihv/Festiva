import { Request, Response } from "express";
import { IHostGoogleSignupController } from "../../../../domain/controlInterface/host/authentication controller interface/interface.hostGoogleSignupController";
import { HostGoogleSignupUseCase } from "../../../../application/use-cases/host/hostAuthentication/usecase.hostGoogleSignup";
import { googleSignupHostDTO } from "../../../../types/DTO/host/usecase-dto/dto.hostGoogleSignup";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import logger from "../../../../utils/common/messages/logger";

export class HostGoogleSignupController implements IHostGoogleSignupController {
  constructor(private googleSignupUseCase: HostGoogleSignupUseCase) {}

  async googleSignup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, profilePic, location } = req.body;

      if (!email || !name) {
        res
          .status(statusCodes.forbidden)
          .json({ message: "Email and name are required." });
        return;
      }

      const signupData: googleSignupHostDTO = {
        name,
        email,
        phone,
        profilePic,
        location,
      };

      const { host, accessToken, refreshToken } =
        await this.googleSignupUseCase.hostGoogleSignup(signupData);

      res.status(statusCodes.Success).json({
        success: true,
        message: "Registered with Google successfully",
        host,
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error("Google signup error:", error.message);

      if (error.response) {
        res
          .status(error.response.status)
          .json({ message: error.response.data.message });
      } else if (error instanceof Error) {
        res.status(statusCodes.serverError).json({ message: error.message });
      } else {
        res
          .status(statusCodes.serverError)
          .json({ message: statusMessages.serverError });
      }
    }
  }
}
