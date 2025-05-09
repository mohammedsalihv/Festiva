import { IUser } from "../../../domain/entities/modelInterface/user.interface";
import { IUserManagementRepository } from "../../../domain/entities/repositoryInterface/admin/userManagement.interface";
import { UserModal } from "../../../domain/models/userModel";

export class UserManagementRepository implements IUserManagementRepository {
  async findAll(): Promise<IUser[]> {
    return UserModal.find().exec();
  }
  async UserBlockUnblock(userId: string, isBlocked: boolean): Promise<boolean> {
      const result = await UserModal.updateOne({_id:userId},{isBlocked})
      return result.modifiedCount > 0;
  }
}

