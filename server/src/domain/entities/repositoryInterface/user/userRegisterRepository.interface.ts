import { Iuser } from "../../modelInterface/user.interface";;

export interface IUserRegisterRepository {
  findByEmail(email: string): Promise<Iuser | null>;
  createUser(user: Iuser): Promise<Iuser>;
}

      