import { OTPSendingDTO } from "../../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.otp";
export interface IOTPUseCase {
  sendOTP(email: string): Promise<OTPSendingDTO>;
  verifyOTP(email: string, otp: string): Promise<void>;
  deleteExpiredOTPs(email: string): Promise<void>;
}
