import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";
import { googleLoginHostDTO } from "../../../../types/DTO/user/dto.hostGoogleLogin";

export interface IHostGoogleLoginUseCase {
  hostGoogleLogin(data: googleLoginHostDTO): Promise<HostDetailsDTO>;
}
