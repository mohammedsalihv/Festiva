import { IHostPaymentRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostBaseRepositoryInterfaces/interface.hostPaymentRepository";
import { Types } from "mongoose";
import { IPayment } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.payment";
import paymentModel from "../../../../domain/entities/databaseModels/baseModels/basePaymentModels/paymentModel";

export class HostPaymentRepository implements IHostPaymentRepository {
  async getHostDashboardPayments(
    hostId: string | Types.ObjectId
  ): Promise<IPayment[]> {
    return (await paymentModel
      .find()
      .populate({
        path: "bookingId",
        match: { "bookedData.host": hostId },
      })
      .lean()
      .then((payments) => payments.filter((p) => p.bookingId))) as IPayment[];
  }
}
