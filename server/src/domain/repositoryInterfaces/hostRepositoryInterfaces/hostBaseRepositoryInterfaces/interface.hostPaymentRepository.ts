import { Types } from "mongoose";
import { IPayment } from "../../../modelInterface/base/interface.payment";

export interface IHostPaymentRepository {
  getHostDashboardPayments(
    hostId: string | Types.ObjectId
  ): Promise<IPayment[]>;
}
