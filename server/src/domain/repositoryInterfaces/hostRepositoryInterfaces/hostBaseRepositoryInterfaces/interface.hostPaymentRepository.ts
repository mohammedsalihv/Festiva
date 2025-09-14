import { Types } from "mongoose";
import { IPayment } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.payment";

export interface IHostPaymentRepository {
  getHostDashboardPayments(
    hostId: string | Types.ObjectId
  ): Promise<IPayment[]>;
}
