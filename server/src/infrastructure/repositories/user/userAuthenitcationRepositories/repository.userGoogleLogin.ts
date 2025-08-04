import { IUserModel } from "../../../../domain/entities/modelInterface/user/interface.user";
import { IUserGoogleLoginRepository } from "../../../../domain/entities/repositoryInterface/user/authentication/interface.userGoogleLoginRepository";
import { UserModel } from "../../../../domain/models/user/userAuthenticationModels/userModel";


export class UserGoogleLoginRepository implements IUserGoogleLoginRepository {
  async findByEmail(email: string): Promise<IUserModel | null> {
    return await UserModel.findOne({ email });
  }

  async createUser(user: IUserModel): Promise<IUserModel> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async updateUser(
    id: string,
    updates: Partial<IUserModel>
  ): Promise<IUserModel | null> {
    return await UserModel.findByIdAndUpdate(id, updates, { new: true });
  }
}
