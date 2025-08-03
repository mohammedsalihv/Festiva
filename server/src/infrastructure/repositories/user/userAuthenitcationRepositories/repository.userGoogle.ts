import { IUserModel } from "../../../../domain/entities/modelInterface/user/interface.user";
import { IUserGoogleRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userGoogleRepository";
import { UserModel } from "../../../../domain/models/user/userAuthenticationModels/userModel";
import { responseUserDTO } from "../../../../types/DTO/user/dto.user";

export class UserGoogleAuthRepository implements IUserGoogleRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return await UserModel.findOne({ email });
  }

  async createUser(user: IUserModel): Promise<IUserModel> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async updateUser(
    id: string,
    updates: Partial<IUserModel>
  ): Promise<responseUserDTO | null> {
    return await UserModel.findByIdAndUpdate(id, updates, { new: true });
  }
}
