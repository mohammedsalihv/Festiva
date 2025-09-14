import { HostDetailsDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import { googleLoginHostDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export interface IHostGoogleLoginUseCase {
  hostGoogleLogin(data: googleLoginHostDTO): Promise<HostDetailsDTO>;
}
