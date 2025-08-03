import { hostLoginDTO } from "../../../types/DTO/host/dto.hostLogin";

export interface IHostLoginUsecaseValidator {
  validateRequiredFields(email: string, password: string): void;
  validateHostExistence(host: any): void;
  validateAccountExistence(host: any): void;
  validatePassword(
    storedPassword: string,
    inputPassword: string
  ): Promise<void>;
}

export interface IHostLoginControllerValidator {
  validate(data: hostLoginDTO): void;
}
