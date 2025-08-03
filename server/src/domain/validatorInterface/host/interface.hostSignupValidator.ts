
import { registerHostDTO } from "../../../types/DTO/host/dto.host";

export interface IHostSignupValidator {
  validate(data: any): registerHostDTO; 
}
