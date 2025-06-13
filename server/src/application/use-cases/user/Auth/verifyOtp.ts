import {IOTPVerifyRepository} from '../../../../domain/entities/repositoryInterface/user/interface.verifyOtprepository'
import CustomError from '../../../../utils/common/errors/CustomError';

export class VerifyOtp {
   constructor(private otpRepository: IOTPVerifyRepository) {}

   async execute(email: string, otp: string): Promise<void> {
       if(!email || !otp) {
           throw new CustomError('Email and OTP required', 400)
       }

       const latestOtp = await this.otpRepository.findLatestOTPByEmail(email)
       if(!latestOtp) {
           throw new CustomError('OTP not found', 404)
       }
       if(latestOtp.otp !== otp) {
           throw new CustomError('OTP not matched', 400)
       }
}
}