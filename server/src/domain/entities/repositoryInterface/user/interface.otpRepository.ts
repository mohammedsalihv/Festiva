import { IOTP } from "../../modelInterface/interface.otp";

export interface IOTPRepository {
  findByEmail(email: string): Promise<IOTP | null>;
  createOTP(otpData: Partial<IOTP>): Promise<IOTP>;
  deleteOTP(email: string): Promise<void>; 
}
