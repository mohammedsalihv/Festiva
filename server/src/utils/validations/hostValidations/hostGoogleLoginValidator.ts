import { IHostGoogleLoginValidator } from "../../../domain/validatorInterfaces/hostValidatorInterfaces/interface.hostGoogleLoginValidator";
import { googleLoginHostDTO } from "../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import CustomError from "../../baseUtilities/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../baseUtilities/messages/constantResponses";

export class HostGoogleLoginValidator implements IHostGoogleLoginValidator {
  validate(data: googleLoginHostDTO): void {
    if (!data.email) {
      throw new CustomError(
        statusMessages.emailRequired,
        statusCodes.forbidden
      );
    }

    if (data.name && typeof data.name !== "string") {
      throw new CustomError(
        statusMessages.invalidNameFormat,
        statusCodes.notfound
      );
    }
  }
}
