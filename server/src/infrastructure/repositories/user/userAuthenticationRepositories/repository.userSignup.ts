import { IUserModel } from "../../../../domain/entities/databaseModelInterfaces/userModelInterfaces/interface.user";
import { IUserSignupRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userSignupRepository";
import { UserModel } from "../../../../domain/models/user/userAuthenticationModels/userModel";
import { responseUserDTO } from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.user";

export class UserSignupRepository implements IUserSignupRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return UserModel.findOne({ email });
  }
  async createUser(user: IUserModel): Promise<IUserModel> {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  }
}