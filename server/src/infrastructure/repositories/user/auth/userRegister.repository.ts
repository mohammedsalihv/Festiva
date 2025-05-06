import { IUser } from "../../../../domain/entities/modelInterface/user.interface";
import { IUserRegisterRepository } from "../../../../domain/entities/repositoryInterface/user/userRegisterRepository.interface";
import { UserModal } from "../../../../domain/models/userModel";

export class UserRegisterRepository implements IUserRegisterRepository {
    async findByEmail(email: string): Promise<IUser | null> {
      return UserModal.findOne({ email });
    }
    async createUser(user: IUser): Promise<IUser> {
      const newUser = new UserModal(user);
      await newUser.save();
      return newUser;
    }
  }
  