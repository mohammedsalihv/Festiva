import { IUser } from "../../../../domain/entities/modelInterface/interface.user";
import { IUserRegisterRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userRegisterRepository";
import { UserModal } from "../../../../domain/models/userModel";
import { responseUserDTO } from "../../../../config/DTO/user/dto.user";

export class UserRegisterRepository implements IUserRegisterRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return UserModal.findOne({ email });
  }
  async createUser(user: IUser): Promise<responseUserDTO> {
    const newUser = new UserModal(user);
    await newUser.save();
    return newUser;
  }
}
