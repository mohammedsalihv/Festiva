import { IUserLoginRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userLoginRepository";
import { responseUserDTO } from "../../../../types/DTO/user/dto.user";
import { UserModel } from "../../../../domain/models/user/userAuthenticationModels/userModel";

export class UserLoginRepository implements IUserLoginRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return UserModel.findOne({ email });
  }
}
