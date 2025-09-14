import { IUserLoginRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userAuthenticationRepositoryInterfaces/interface.userLoginRepository";
import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";
import { UserModel } from "../../../../domain/entities/databaseModels/user/userAuthenticationModels/userModel";

export class UserLoginRepository implements IUserLoginRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return UserModel.findOne({ email });
  }
}
