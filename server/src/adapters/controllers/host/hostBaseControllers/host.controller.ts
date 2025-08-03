import { Request, Response } from "express";
import { IHostController } from "../../../domain/controlInterface/host/interface.hostController";
import { IHostUseCase } from "../../../domain/usecaseInterface/host/baseUsecaseInterfaces/interface.hostUseCase";
import { statusCodes, statusMessages } from "../../../utils/common/messages/constantResponses";
import CustomError from "../../../utils/common/errors/CustomError";

export class HostController implements IHostController {
  constructor(private hostUseCase: IHostUseCase) {}

  async mailValidation(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "Email is required",
        });
        return;
      }
      const result = await this.hostUseCase.validateEmail(email);
      res.status(result.status).json({
        success: result.success,
        message: result.message,
      });
    } catch (error) {
      console.error("Email validation error:", error);

      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(statusCodes.serverError).json({
          success: false,
          message: statusMessages.serverError,
        });
      }
    }
  }
}
