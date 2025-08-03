import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";
import { googleSignupHostDTO } from "../../../../types/DTO/user/dto.hostGoogleSignup";

export interface IHostGoogleSignupUseCase {
  hostGoogleSignup(data: googleSignupHostDTO): Promise<HostDetailsDTO>;
}
