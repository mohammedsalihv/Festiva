import { userDetailsDTO } from "../../../../types/DTO/user/dto.user";

export interface IUserGoogleLoginUseCase {
  execute(
    firstname: string,
    googleId: string,
    email: string
  ): Promise<userDetailsDTO>;
}
