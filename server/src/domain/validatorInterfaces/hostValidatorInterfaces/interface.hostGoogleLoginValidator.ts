import { googleLoginHostDTO } from "../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
export interface IHostGoogleLoginValidator {
  validate(data: googleLoginHostDTO): void;
}
