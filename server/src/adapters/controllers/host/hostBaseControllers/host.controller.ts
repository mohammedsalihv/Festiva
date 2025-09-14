import { Request, Response } from "express";
import { IHostController } from "../../../../domain/controllerInterfaces/hostControllerInterfaces/hostBaseControllerInterfaces/interface.hostController";
import { IHostUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostBaseUsecaseInterfaces/interface.hostUseCase";
import { statusCodes , statusMessages } from "../../../../utils/baseUtilities/messages/constantResponses";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";

export class HostController implements IHostController {
  constructor(private _hostUseCase: IHostUseCase) {}

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
      const result = await this._hostUseCase.validateEmail(email);
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
