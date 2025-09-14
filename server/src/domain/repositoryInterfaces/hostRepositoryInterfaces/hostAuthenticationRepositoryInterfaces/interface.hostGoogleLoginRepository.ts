import { IHostGoogle } from "../../../baseInterfaces/hostBaseInterfaces/hostAuthenticationBaseInterfaces/interface.hostGoogle";
import { responseHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export interface IHostGoogleLoginRepository {
  findByEmail(email: string): Promise<responseHostDTO | null>;
  createHost(host: IHostGoogle): Promise<responseHostDTO>;
}
