import { Request, Response } from "express";
import { IPaymentController } from "../../../../domain/controlInterface/common/payment/interface.paymentController";
import { IStripePaymentUseCase } from "../../../../domain/usecaseInterface/base/payment/interface.stripePaymentUsecase";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import logger from "../../../../utils/common/messages/logger";
import CustomError from "../../../../utils/common/errors/CustomError";

export class PaymentController implements IPaymentController {
  constructor(private _stripePaymentUseCase: IStripePaymentUseCase) {}

  async startPayment(req: Request, res: Response): Promise<void> {
    try {
      const { amount, currency } = req.body;

      const allowedCurrencies = ["inr", "usd"];
      if (!allowedCurrencies.includes(currency.toLowerCase())) {
        throw new CustomError("Unsupported currency", statusCodes.badRequest);
      }
      const paymentIntent = await this._stripePaymentUseCase.execute(
        amount,
        currency
      );
      res.status(statusCodes.Success).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
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
