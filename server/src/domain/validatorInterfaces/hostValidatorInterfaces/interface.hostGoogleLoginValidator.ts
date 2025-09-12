import { googleLoginHostDTO } from "../../../types/DTO's/userDTO's/dto.hostGoogleLogin";

export interface IHostGoogleLoginValidator {
  validate(data: googleLoginHostDTO): void;
}
