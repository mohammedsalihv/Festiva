import { Types } from "mongoose";
import { IHostModel } from "../../../entities/databaseModelInterfaces/hostModelInterfaces/interface.host";

export interface IHostRepository {
  findByEmail(email: string): Promise<IHostModel | null>;
  findById(email: string | Types.ObjectId): Promise<IHostModel | null>
}
