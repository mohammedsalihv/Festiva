import { googleSignupHostDTO } from "../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.hostGoogleSignup";

export interface IHostGoogleSignupValidator {
  validate(data: googleSignupHostDTO): void;
}
