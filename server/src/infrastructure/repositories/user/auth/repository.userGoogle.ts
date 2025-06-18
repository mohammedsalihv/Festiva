import { IUser } from "../../../../domain/entities/modelInterface/interface.user";
import { IUserGoogleRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userGoogleRepository";
import { UserModal } from "../../../../domain/models/userModel";
import { responseUserDTO } from "../../../../types/DTO/user/dto.user";



export class UserGoogleAuthRepository implements IUserGoogleRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return await UserModal.findOne({ email });
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new UserModal(user);
    return await newUser.save();
  }

  async updateUser(id: string, updates: Partial<IUser>): Promise<responseUserDTO | null> {
    return await UserModal.findByIdAndUpdate(id, updates, { new: true });
  }
}

