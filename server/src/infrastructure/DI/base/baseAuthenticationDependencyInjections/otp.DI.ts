import { OTPController } from "../../../../adapters/controllers/base/otp.controller";
import { OTPRepository } from "../../../repositories/base/authentication/repository.otp";
import { OTPUseCase } from "../../../../application/usecases/base/usecase.otp";

const otpRepository = new OTPRepository();
const otpUseCase = new OTPUseCase(otpRepository);
const otpController = new OTPController(otpUseCase);
export { otpController };
