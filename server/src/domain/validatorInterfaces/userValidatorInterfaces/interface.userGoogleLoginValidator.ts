import { googleLoginUserDTO } from "../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.hostGoogleLogin";

export interface IUserGoogleLoginValidator {
  validate(data: googleLoginUserDTO): void;
}
