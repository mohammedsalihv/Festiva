import { HostDetailsDTO } from "../../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import { googleSignupHostDTO } from "../../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.hostGoogleSignup";

export interface IHostGoogleSignupUseCase {
  hostGoogleSignup(data: googleSignupHostDTO): Promise<HostDetailsDTO>;
}
