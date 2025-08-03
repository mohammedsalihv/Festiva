import { IUserGoogleLoginValidator } from "../../../domain/validatorInterface/user/interface.userGoogleLoginValidator";
import { googleLoginUserDTO } from "../../../types/DTO/user/dto.hostGoogleLogin";
import CustomError from "../../common/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../common/messages/constantResponses";

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
