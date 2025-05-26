import { responseHostDTO } from "../../../../config/DTO/host/dto.host";
import { IHost } from "../../modelInterface/interface.host";

export interface IHostRegisterRepository {
  createHost(host: IHost): Promise<responseHostDTO>;
}
