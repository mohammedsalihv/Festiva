import { IOTP } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.otp";

export interface IOTPRepository {
  findByEmail(email: string): Promise<IOTP | null>;
  createOTP(otpData: Partial<IOTP>): Promise<IOTP>;
  verifyOTP(otp: string): Promise<IOTP | null>;
  deleteOTP(email: string): Promise<void>;
}
