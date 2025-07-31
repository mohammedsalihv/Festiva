import { IHost } from "../../../modelInterface/interface.host";
import { responseHostDTO } from "../../../../../types/DTO/host/dto.host";

export interface IHostGoogleSignupRepository {
  findByEmail(email: string): Promise<responseHostDTO | null>;
  createHost(host: IHost): Promise<responseHostDTO>;
}
