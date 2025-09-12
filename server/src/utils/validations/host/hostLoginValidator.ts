import bcrypt from "bcrypt";
import CustomError from "../../baseUtilities/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../baseUtilities/messages/constantResponses";
import { IHostLoginUsecaseValidator } from "../../../domain/validatorInterface/host/interface.hostLoginValidator";
import { IHostLoginControllerValidator } from "../../../domain/validatorInterface/host/interface.hostLoginValidator";
import { hostLoginDTO } from "../../../types/DTO's/hostDTO's/dto.hostLogin";


export class HostLoginUsecaseValidator implements IHostLoginUsecaseValidator {
  validateRequiredFields(email: string, password: string): void {
    if (!email || !password) {
      throw new CustomError("All fields are required", statusCodes.forbidden);
    }
  }

  validateHostExistence(host: any): void {
    if (!host) {
      throw new CustomError(
        statusMessages.invalidCredential,
        statusCodes.unAuthorized
      );
    }
  }

  validateAccountExistence(host: any): void {
    if (!host) {
      throw new CustomError(
        statusMessages.accountNotfound,
        statusCodes.notfound
      );
    }
  }

  async validatePassword(storedPassword: string, inputPassword: string): Promise<void> {
    const isValid = storedPassword
      ? await bcrypt.compare(inputPassword, storedPassword)
      : false;
    if (!isValid) {
      throw new CustomError(
        statusMessages.invalidCredential,
        statusCodes.unAuthorized
      );
    }
  }
}



export class HostLoginControllerValidator implements IHostLoginControllerValidator {
  validate(data: hostLoginDTO): void {
    if (!data.email || !data.password) {
      throw new CustomError(statusMessages.invalidCredential, statusCodes.unAuthorized);
    }
  }
}
