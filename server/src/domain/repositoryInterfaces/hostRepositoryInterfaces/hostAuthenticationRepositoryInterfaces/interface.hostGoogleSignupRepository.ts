import { IHostGoogleAuth } from "../../../modelInterface/host/interface.hostGoogleAuth";
import { responseHostDTO } from "../../../../../types/DTO/host/dto.host";

export interface IHostGoogleSignupRepository {
  findByEmail(email: string): Promise<responseHostDTO | null>;
  createHost(host: IHostGoogleAuth): Promise<responseHostDTO>;
}
