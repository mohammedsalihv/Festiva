import { IUser } from "../../../../domain/entities/modelInterface/interface.user";
import { IUserSignupRepository } from "../../../../domain/entities/repositoryInterface/user/interface.userSignupRepository";
import { UserModal } from "../../../../domain/models/userModel";
import { responseUserDTO } from "../../../../config/DTO/user/dto.user";

export class UserSignupRepository implements IUserSignupRepository {
  async findByEmail(email: string): Promise<responseUserDTO | null> {
    return UserModal.findOne({ email });
  }
  async createUser(user: IUser): Promise<responseUserDTO> {
    const newUser = new UserModal(user);
    await newUser.save();
    return newUser;
  }
}
