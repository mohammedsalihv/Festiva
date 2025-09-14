import { Request, Response } from "express";
import { IHostLoginController } from "../../../../domain/controllerInterfaces/hostControllerInterfaces/hostAuthenticationControllerInterfaces/interface.hostLoginController";
import { IHostLoginUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostAuthenticationUsecaseInterfaces/interface.hostLoginUseCase";
import { IHostLoginControllerValidator } from "../../../../domain/validatorInterfaces/hostValidatorInterfaces/interface.hostLoginValidator";
import logger from "../../../../utils/baseUtilities/messages/logger";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";
import { toHostLoginResponseDTO } from "../../../../types/DTO's/hostDTO's/hostAuthenticationDTO's/dto.hostLogin";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";

export class HostLoginController implements IHostLoginController {
  constructor(
    private _hostLoginUsecase: IHostLoginUseCase,
    private _validator: IHostLoginControllerValidator
  ) {}

  async hostLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      this._validator.validate({ email, password });

      const { accessToken, refreshToken, host } =
        await this._hostLoginUsecase.execute(email, password);

      const hostResponse = toHostLoginResponseDTO(
        host,
        accessToken,
        refreshToken
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Host logged in successfully",
        host: hostResponse,
      });
    } catch (error: any) {
      logger.error("Login Error:", error);

      if (error.message === "Invalid credentials") {
        return res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      if (error.message === "Host not found") {
        return res.status(statusCodes.notfound).json({
          success: false,
          message: "User not found",
        });
      }

      if (error.name === "ValidationError" || error instanceof CustomError) {
        return res.status(error.statusCode || statusCodes.unAuthorized).json({
          success: false,
          message: error.message,
        });
      }

      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message,
      });
    }
  }
}
