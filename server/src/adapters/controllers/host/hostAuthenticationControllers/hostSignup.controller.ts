import { Request, Response } from "express";
import { IHostSignupController } from "../../../../domain/controlInterface/host/authentication controller interface/interaface.hostSignupController";
import { IHostSignupUseCase } from "../../../../domain/usecaseInterface/host/authenticationUsecaseInterfaces/interface.hostSignupUseCase";
import { IHostSignupValidator } from "../../../../domain/validatorInterface/host/interface.hostSignupValidator";
import { toHostSignupResponseDTO } from "../../../../types/DTO/host/dto.hostSignup";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";

export class HostSignupController implements IHostSignupController {
  constructor(
    private hostSignupUsecase: IHostSignupUseCase,
    private validator: IHostSignupValidator
  ) {}
  async signupNewHost(req: Request, res: Response): Promise<void> {
    try {
      const hostData = this.validator.validate(req.body);

      const { host, accessToken, refreshToken } =
        await this.hostSignupUsecase.hostSignup(hostData);

      const responseData = toHostSignupResponseDTO(
        host,
        accessToken,
        refreshToken
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Registered successfully",
        ...responseData,
      });
    } catch (error: any) {
      logger.error("Error during registration:", error.message);

      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
      } else if (error instanceof Error) {
        res
          .status(statusCodes.serverError)
          .json({ success: false, message: error.message });
      } else {
        res
          .status(statusCodes.serverError)
          .json({ success: false, message: statusMessages.serverError });
      }
    }
  }
}
