import { Types } from "mongoose";
import { IHostModel } from "../../../modelInterface/host/interface.host";

export interface IHostRepository {
  findByEmail(email: string): Promise<IHostModel | null>;
  findById(email: string | Types.ObjectId): Promise<IHostModel | null>;
}
