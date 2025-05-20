import { IUser } from "../../modelInterface/user.interface";;

export interface IUserRegisterRepository {
  findByEmail(email: string): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUser>;
}

      