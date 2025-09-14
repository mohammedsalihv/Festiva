import { Request, Response } from "express";
import { IPaymentController } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/basePaymentControllerInterfaces/interface.paymentController";
import { IPaymentUseCase } from "../../../../domain/usecaseInterfaces/baseUsecaseInterfaces/basePaymentUsecaseInterfaces/interface.paymentUsecase";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import logger from "../../../../utils/baseUtilities/messages/logger";
import { validatePaymentRequest } from "../../../../types/DTO's/baseDTO's/payment";

export class PaymentController implements IPaymentController {
  constructor(private _paymentUseCase: IPaymentUseCase) {}

  async startPayment(req: Request, res: Response): Promise<void> {
    try {
      const paymentPayload = validatePaymentRequest(req.body);
      const paymentResult = await this._paymentUseCase.execute(paymentPayload);

      res.status(statusCodes.Success).json({
        success: true,
        payment: paymentResult,
      });
    } catch (error: any) {
      logger.error("Start Payment Error:", error);
      res.status(error.statusCode || statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }

  async paymentStatusUpdate(req: Request, res: Response): Promise<void> {
    try {
      const { status, paymentId } = req.body;

      const updatedPayment = await this._paymentUseCase.paymentStatus(
        status,
        paymentId
      );

      if (!updatedPayment) {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "Payment not found",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        payment: updatedPayment,
      });
    } catch (error: any) {
      logger.error("Payment Status Update Error:", error);
      res.status(error.statusCode || statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }
}
