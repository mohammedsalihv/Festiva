import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";
import { registerHostDTO } from "../../../../types/DTO/host/dto.host";

export interface IHostSignupUseCase {
  hostSignup(hostData: registerHostDTO): Promise<HostDetailsDTO>;
}
