import { IUser } from "../../modelInterface/user.interface";

export interface IUserProfileRepository {
  changeProfile(userId: string, imageFilename: string): Promise<IUser>;
}

