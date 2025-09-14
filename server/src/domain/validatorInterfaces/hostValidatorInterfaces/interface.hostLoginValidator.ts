import { hostLoginDTO } from "../../../types/DTO's/hostDTO's/hostAuthenticationDTO's/dto.hostLogin";


export interface IHostLoginUsecaseValidator {
  validateRequiredFields(email: string, password: string): void;
  validateHostExistence(host: any | null): void;
  validateAccountExistence(host: any | null): void;
  validatePassword(
    storedPassword: string,
    inputPassword: string
  ): Promise<void>;
}

export interface IHostLoginControllerValidator {
  validate(data: hostLoginDTO): void;
}
