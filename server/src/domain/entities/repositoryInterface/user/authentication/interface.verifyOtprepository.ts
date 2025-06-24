import { IOTP } from "../../modelInterface/interface.otp";

export interface IOTPVerifyRepository {
  findLatestOTPByEmail(email: string): Promise<IOTP | null>;
}
