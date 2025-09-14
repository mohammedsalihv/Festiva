import { responseHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import { IHostModel } from "../../../entities/databaseModelInterfaces/hostModelInterfaces/interface.host";

export interface IHostSignupRepository {
  createHost(host: IHostModel): Promise<responseHostDTO>;
}
