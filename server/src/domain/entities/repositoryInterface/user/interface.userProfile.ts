import { IUser } from "../../modelInterface/user.interface";
import { profileEditDTO } from "../../../../config/DTO/userDtos";

export interface IUserProfileRepository {
  setProfilePic(userId: string, imageFilename: string): Promise<IUser>;
  profileEdit(userId:string,form:profileEditDTO):Promise<IUser>
}

