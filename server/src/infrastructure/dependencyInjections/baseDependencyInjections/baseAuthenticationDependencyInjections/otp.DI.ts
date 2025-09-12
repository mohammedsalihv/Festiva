import { OTPController } from "../../../../adapters/controllers/base/baseAuthenticationControllers/otp.controller";
import { OTPRepository } from "../../../repositories/base/baseAuthenticationRepositories/repository.otp";
import { OTPUseCase } from "../../../../application/usecases/base/baseAuthenticationUsecase/usecase.otp";

const otpRepository = new OTPRepository();
const otpUseCase = new OTPUseCase(otpRepository);
const otpController = new OTPController(otpUseCase);
export { otpController };
