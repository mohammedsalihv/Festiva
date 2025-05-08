import { IUser } from "../../../domain/entities/modelInterface/user.interface";
import { IUserManagementRepository } from "../../../domain/entities/repositoryInterface/admin/userManagement.interface";
import { UserModal } from "../../../domain/models/userModel";

export class UserManagementRepostory implements IUserManagementRepository {
  async findAll(): Promise<IUser[]> {
    return UserModal.find().exec();
  }
}
