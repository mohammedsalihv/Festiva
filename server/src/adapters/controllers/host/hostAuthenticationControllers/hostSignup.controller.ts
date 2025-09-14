import { Request, Response } from "express";
import { IHostSignupController } from "../../../../domain/controllerInterfaces/hostControllerInterfaces/hostAuthenticationControllerInterfaces/interaface.hostSignupController";
import { IHostSignupUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostAuthenticationUsecaseInterfaces/interface.hostSignupUseCase";
import { IHostSignupValidator } from "../../../../domain/validatorInterfaces/hostValidatorInterfaces/interface.hostSignupValidator";
import { toHostSignupResponseDTO } from "../../../../types/DTO's/hostDTO's/hostAuthenticationDTO's/dto.hostSignup";
import logger from "../../../../utils/baseUtilities/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";

export class HostSignupController implements IHostSignupController {
  constructor(
    private _hostSignupUsecase: IHostSignupUseCase,
    private _validator: IHostSignupValidator
  ) {}
  async signupNewHost(req: Request, res: Response): Promise<void> {
    try {
      const hostData = this._validator.validate(req.body);

      const { host, accessToken, refreshToken } =
        await this._hostSignupUsecase.hostSignup(hostData);

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
