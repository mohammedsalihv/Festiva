import { HostDetailsDTO } from "../../../../types/DTO/host/dto.host";
import { googleSignupHostDTO } from "../../../../types/DTO/host/usecase-dto/dto.hostGoogleSignup";

export interface IHostGoogleSignupUseCase {
  hostGoogleSignup(data: googleSignupHostDTO): Promise<HostDetailsDTO>;
}
