import { mailValidation } from "../../../../types/DTO/host/dto.host";
import { IHostModel } from "../../../entities/modelInterface/host/interface.host";

export interface IHostUseCase {
  validateEmail(email: string): Promise<mailValidation>;
  hostDetails(hostId:string):Promise<IHostModel>
}
