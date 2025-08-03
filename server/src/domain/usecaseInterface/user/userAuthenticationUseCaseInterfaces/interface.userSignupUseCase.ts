import { userSignupDTO } from "../../../../types/DTO/user/dto.userSignup";
import { userDetailsDTO } from "../../../../types/DTO/user/dto.user";

export interface IUserSignupUseCase {
  userSignup(signupData: userSignupDTO): Promise<userDetailsDTO>;
}
