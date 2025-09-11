import { IUserModel } from "../../../../domain/entities/modelInterface/user/interface.user";
import { IUserSignupRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userSignupRepository";
import { UserModel } from "../../../../domain/models/user/userAuthenticationModels/userModel";
import { responseUserDTO } from "../../../../types/DTO/user/dto.user";

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