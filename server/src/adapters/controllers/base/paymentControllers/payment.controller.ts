import { Request, Response } from "express";
import { IPaymentController } from "../../../../domain/controlInterface/common/payment/interface.paymentController";
import { IPaymentUseCase } from "../../../../domain/usecaseInterface/base/payment/interface.paymentUsecase";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import logger from "../../../../utils/common/messages/logger";
import { validatePaymentRequest } from "../../../../types/DTO/common/payment";

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
    await this._paymentUseCase.paymentStatus(status, paymentId);
    res.status(statusCodes.Success).json({ success: true });
  } catch (error: any) {
    logger.error("Payment Status Update Error:", error);
    res.status(error.statusCode || statusCodes.serverError).json({
      success: false,
      message: error.message || statusMessages.serverError,
    });
  }
}


}
