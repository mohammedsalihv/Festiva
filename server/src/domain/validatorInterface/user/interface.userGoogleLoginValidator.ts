import { googleLoginUserDTO } from "../../../types/DTO/user/dto.hostGoogleLogin";

export interface IUserGoogleLoginValidator {
  validate(data: googleLoginUserDTO): void;
}
