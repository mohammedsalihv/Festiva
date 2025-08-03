import { googleSignupHostDTO } from "../../../types/DTO/user/dto.hostGoogleSignup";

export interface IHostGoogleSignupValidator {
  validate(data: googleSignupHostDTO): void;
}
