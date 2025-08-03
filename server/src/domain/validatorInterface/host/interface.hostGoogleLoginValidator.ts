import { googleLoginHostDTO } from "../../../types/DTO/user/dto.hostGoogleLogin";

export interface IHostGoogleLoginValidator {
  validate(data: googleLoginHostDTO): void;
}
