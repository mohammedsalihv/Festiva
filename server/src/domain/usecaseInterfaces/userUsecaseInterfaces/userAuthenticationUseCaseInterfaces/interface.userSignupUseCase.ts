import { userSignupDTO } from "../../../../types/DTO's/userDTO's/userAuthenticationDTO's/dto.userSignup";
import { userDetailsDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export interface IUserSignupUseCase {
  userSignup(signupData: userSignupDTO): Promise<userDetailsDTO>;
}
