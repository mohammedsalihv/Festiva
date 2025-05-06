// import { IUserRegisterRepository } from "../../../../domain/entities/repositoryInterface/user/userRegisterRepository.interface";
// import { Iuser } from "../../../../domain/entities/modelInterface/user.interface";
// import CustomError from "../../../../utils/errorHandler";
// import { TokenService } from "../../../services/service.token";

// export class GoogleLogin {
//   constructor(private userRepository: IUserRegisterRepository) {}

//   async execute(
//     firstname: string,
//     googleId: string,
//     email: string
//   ): Promise<{
//     accessToken: string;
//     refreshToken: string;
//     user: {
//       firstname: string;
//       email: string;
//       id: string;
//       role: string;
//     };
//   }> {
//     let user = await this.userRepository.findByEmail(email);

//     if (user) {
//       if (!user.googleId) {
//         user = await this.userRepository.updateUser(user._id!, {
//           googleId,
//           isActive: true,
//         });
//       }

//       if (!user?.isActive) {
//         throw new CustomError("User is not active", 403);
//       }
//     } else {
//       user = await this.userRepository.createUser({
//         email,
//         firstname,
//         googleId,
//         isActive: true,
//         role: "user",
//         isVerified: false,
//       });
//     }

//     const accessToken = TokenService.generateAccessToken({
//       id: user._id!,
//       role: user.role,
//     });
//     const refreshToken = TokenService.generateRefreshToken({
//       id: user._id!,
//       role: user.role,
//     });

//     return {
//       accessToken,
//       refreshToken,
//       user: {
//         id: user._id!,
//         firstname: user.firstname,
//         email: user.email,
//         role: user.role || "user",
//       },
//     };
//   }
// }
