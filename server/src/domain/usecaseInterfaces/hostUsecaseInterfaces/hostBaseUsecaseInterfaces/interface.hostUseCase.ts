import { mailValidation } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import { IHostModel } from "../../../entities/databaseModelInterfaces/hostModelInterfaces/interface.host";

export interface IHostUseCase {
  validateEmail(email: string): Promise<mailValidation>;
  hostDetails(hostId:string):Promise<IHostModel | null>
}
