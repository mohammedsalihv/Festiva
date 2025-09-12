import {userGoogleLoginResponseDTO , googleLoginUserDTO } from "../../../../types/DTO's/userDTO's/dto.hostGoogleLogin";

export interface IUserGoogleLoginUseCase {
  execute(data: googleLoginUserDTO): Promise<userGoogleLoginResponseDTO>;
}
