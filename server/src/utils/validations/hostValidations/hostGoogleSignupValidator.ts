import { IHostGoogleSignupValidator } from "../../../domain/validatorInterface/host/interface.hostGoogleSignupValidator";
import { googleSignupHostDTO } from "../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.hostGoogleSignup";
import CustomError from "../../baseUtilities/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../baseUtilities/messages/constantResponses";


export class HostGoogleSignupValidator implements IHostGoogleSignupValidator {
  validate(data: googleSignupHostDTO): void {
    if (!data.signupMethod || data.signupMethod !== "google") {
      throw new CustomError(
        statusMessages.invalidSignupMethod,
        statusCodes.forbidden
      );
    }

    if (!data.email || !data.name) {
      throw new CustomError(
        statusMessages.invalidMail,
        statusCodes.forbidden
      );
    }
  }
}
