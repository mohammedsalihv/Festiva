import bcrypt from "bcrypt";
import CustomError from "../../common/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../common/messages/constantResponses";
import { IAdminLoginValidator } from "../../../domain/validatorInterface/admin/interface.adminLoginValidator";

export class AdminLoginValidator implements IAdminLoginValidator {
  validateAdminExistence(admin: any) {
    if (!admin) {
      throw new CustomError(
        statusMessages.accountNotfound,
        statusCodes.notfound
      );
    }
  }

  validateAdminRole(admin: any) {
    if (admin.role !== "admin") {
      throw new CustomError(
        statusMessages.accountUnauthorized,
        statusCodes.unAuthorized
      );
    }
  }

  validateAdminBlocked(admin: any) {
    if (admin.isBlocked) {
      throw new CustomError(
        statusMessages.accountBlocked,
        statusCodes.forbidden
      );
    }
  }

  async validatePassword(storedPassword: string, inputPassword: string) {
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
