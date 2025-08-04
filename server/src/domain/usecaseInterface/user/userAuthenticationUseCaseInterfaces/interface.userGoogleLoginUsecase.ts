import {userGoogleLoginResponseDTO , googleLoginUserDTO } from "../../../../types/DTO/user/dto.hostGoogleLogin";

export interface IUserGoogleLoginUseCase {
  execute(data: googleLoginUserDTO): Promise<userGoogleLoginResponseDTO>;
}
