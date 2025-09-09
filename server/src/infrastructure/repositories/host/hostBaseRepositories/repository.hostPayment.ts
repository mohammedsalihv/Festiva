import { IHostPaymentRepository } from "../../../../domain/entities/repositoryInterface/host/hostBaseRepositoryInterfaces/interface.hostPaymentRepository";
import { Types } from "mongoose";
import { IPayment } from "../../../../domain/entities/modelInterface/base/interface.payment";
import paymentModel from "../../../../domain/models/base/payment/paymentModel";

export class HostPaymentRepository implements IHostPaymentRepository {
  async getHostDashboardPayments(
    hostId: string | Types.ObjectId
  ): Promise<IPayment[]> {
    return await paymentModel
      .find()
      .populate({
        path: "bookingId",
        match: { "bookedData.host": hostId },
      })
      .then((payments) => payments.filter((p) => p.bookingId));
  }
}
