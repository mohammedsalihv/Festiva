import { HostDetailsDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import { registerHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export interface IHostSignupUseCase {
  hostSignup(hostData: registerHostDTO): Promise<HostDetailsDTO>;
}
