import { IHostGoogleLoginValidator } from "../../../domain/validatorInterface/host/interface.hostGoogleLoginValidator";
import { googleLoginHostDTO } from "../../../types/DTO/host/dto.host";
import CustomError from "../../common/errors/CustomError";
import {
  statusCodes,
  statusMessages,
} from "../../common/messages/constantResponses";

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
