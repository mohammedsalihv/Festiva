import { IUser } from "../../../domain/entities/modelInterface/user.interface";
import { IUserManagementRepository } from "../../../domain/entities/repositoryInterface/admin/userManagement.interface";
import CustomError from "../../../utils/CustomError";

export class UserManagementUseCase {
  constructor(private userManagementRepository: IUserManagementRepository) {}

  async execute(): Promise<IUser[]> {
    const users = await this.userManagementRepository.findAll();

    if (!users || users.length === 0) {
      throw new CustomError("Users empty", 401);
    }

    return users;
  }


  async UserBlockUnblock(userId:string,isBlocked: boolean):Promise<boolean>{
    const response  = await this.userManagementRepository.UserBlockUnblock(userId,isBlocked)
   
    if (!response) {
      throw new CustomError("Blocking failed", 500);
    }
    return response;
  }
   
}




