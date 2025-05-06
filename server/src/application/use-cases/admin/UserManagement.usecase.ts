import { IUser } from "../../../domain/entities/modelInterface/user.interface";
import { IUserManagementRepository } from "../../../domain/entities/repositoryInterface/admin/userManagement.interface";
import CustomError from "../../../utils/errorHandler";

export class UserManagementUseCase {
  constructor(private userManagementRepository: IUserManagementRepository) {}

  async execute(): Promise<IUser[]> {
    const users = await this.userManagementRepository.findAll();

    if (!users || users.length === 0) {
      throw new CustomError("Users empty", 401);
    }

    return users;
  }
}
