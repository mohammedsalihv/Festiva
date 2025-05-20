import {IOTPVerifyRepository} from "../../../../domain/entities/repositoryInterface/user/interface.verifyOtprepository"
import {IOTP} from '../../../../domain/entities/modelInterface/otp.interface'
import {OTP} from '../../../../domain/models/otpModel'

export class OTPrepository implements IOTPVerifyRepository {
    async findLatestOTPByEmail(email: string): Promise<IOTP | null> {
        return OTP.findOne({ email }).sort({ createdAt: -1 }).exec();
    }
}