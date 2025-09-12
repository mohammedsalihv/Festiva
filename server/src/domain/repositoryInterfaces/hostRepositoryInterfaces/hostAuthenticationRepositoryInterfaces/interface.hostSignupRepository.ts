import { responseHostDTO } from "../../../../../types/DTO/host/dto.host";
import { IHost } from "../../../modelInterface/host/interface.host";

export interface IHostSignupRepository {
  createHost(host: IHost): Promise<responseHostDTO>;
}
