import { IHostSignupValidator } from "../../../domain/validatorInterface/host/interface.hostSignupValidator";
import { registerHostDTO } from "../../../types/DTO's/hostDTO's/hostBaseDTO's/dto.host";
import CustomError from "../../baseUtilities/errors/CustomError";
import { statusCodes } from "../../baseUtilities/messages/constantResponses";

export class HostSignupValidator implements IHostSignupValidator {
  validate(data: any): registerHostDTO {
    const { name, email, phone, password, location } = data;

    if (!name || !email || !phone || !password || !location) {
      throw new CustomError("All fields are required", statusCodes.forbidden);
    }
    return { name, email, phone, password, location };
  }
}
