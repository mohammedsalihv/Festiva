
import { registerHostDTO } from "../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";

export interface IHostSignupValidator {
  validate(data: any): registerHostDTO; 
}
