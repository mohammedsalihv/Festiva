import bcrypt from "bcrypt";
import CustomError from "../../../utils/common/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../../utils/common/messages/constantResponses";
import { IUserLoginValidator } from "../../../domain/validatorInterface/user/interface.userLoginValidator";

export class UserLoginValidator implements IUserLoginValidator {
  validateUserExistence(user: any): void {
    if (!user) {
      throw new CustomError(
        statusMessages.accountNotfound,
        statusCodes.notfound
      );
    }
  }

  validateUserBlocked(user: any): void {
    if (user.isBlocked) {
      throw new CustomError(
        statusMessages.accountBlocked,
        statusCodes.forbidden
      );
    }
  }

  async validatePassword(
    storedPassword: string,
    inputPassword: string
  ): Promise<void> {
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
