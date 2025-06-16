import { Request, Response } from "express";
import { registerHostDTO } from "../../../../config/DTO/host/dto.host";
import { HostSignupUseCase } from "../../../../application/use-cases/host/hostAuthentication/usecase.hostSignup";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class HostSignupController {
  constructor(private HostSignup: HostSignupUseCase) {}

  async hostSignup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, password, location } = req.body;

      if (!name || !email || !phone || !password || !location) {
        res
          .status(statusCodes.forbidden)
          .json({ message: "All fields are required." });
        return;
      }
      const hostData: registerHostDTO = {
        name,
        email,
        phone,
        password,
        location,
      };

      const { host, accessToken, refreshToken } = await this.HostSignup.execute(
        hostData
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Registered successfully",
        host: {
          id: host.id,
          name: host.name,
          phone: host.phone,
          email: host.email,
          location: host.location,
          role: host.role,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      logger.error("Error during registration:", error.message);

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
