import { mailValidation } from "../../../types/DTO/host/dto.host";

export interface IHostUseCase {
  validateEmail(email: string): Promise<mailValidation>;
}
