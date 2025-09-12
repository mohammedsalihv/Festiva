import { IUserGoogleLoginValidator } from "../../../domain/validatorInterface/user/interface.userGoogleLoginValidator";
import { googleLoginUserDTO } from "../../../types/DTO's/userDTO's/dto.hostGoogleLogin";
import CustomError from "../../baseUtilities/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../baseUtilities/messages/constantResponses";

export class UserGoogleLoginValidator implements IUserGoogleLoginValidator {
  validate(data: googleLoginUserDTO): void {
    const { email, firstname } = data;

    if (!email || !firstname) {
      throw new CustomError(
        statusMessages.invalidCredential,
        statusCodes.badRequest
      );
    }

    if (typeof email !== "string" || typeof firstname !== "string") {
      throw new CustomError(
        statusMessages.invalidCredential,
        statusCodes.badRequest
      );
    }

    if (!email.includes("@")) {
      throw new CustomError(statusMessages.invalidMail, statusCodes.badRequest);
    }
  }
}
