import { Request, Response } from "express";
import { IPaymentController } from "../../../../domain/controlInterface/common/payment/interface.paymentController";
import { IPaymentUseCase } from "../../../../domain/usecaseInterface/base/payment/interface.paymentUsecase";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import logger from "../../../../utils/common/messages/logger";
import CustomError from "../../../../utils/common/errors/CustomError";

export class PaymentController implements IPaymentController {
  constructor(private _paymentUseCase: IPaymentUseCase) {}

  async startPayment(req: Request, res: Response): Promise<void> {
    try {
      const { amount, currency } = req.body;

      if (!amount || !currency) {
        throw new CustomError(
          "Amount and currency are required",
          statusCodes.badRequest
        );
      }
      const paymentResult = await this._paymentUseCase.execute(amount, currency);

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
}
