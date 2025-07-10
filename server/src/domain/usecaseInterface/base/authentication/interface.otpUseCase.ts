import { OTPSendingDTO } from "../../../../types/DTO/user/dto.otp";
export interface IOTPUseCase {
  sendOTP(email: string): Promise<OTPSendingDTO>;
  verifyOTP(email: string, otp: string): Promise<void>;
  deleteExpiredOTPs(email: string): Promise<void>;
}
