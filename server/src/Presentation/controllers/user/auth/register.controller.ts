import { Request , Response } from "express";
import { registerUserDTO} from "../../../../config/DTO/user/dto.user";
import { RegisterUser } from "../../../../application/use-cases/user/Auth/registerUser";

export class UserRegisterController{
    constructor(private registerUser : RegisterUser){}

   async register(req:Request , res:Response) : Promise<void>{
        try {
            const {firstname , lastname , email , phone , password } = req.body
            const userData: registerUserDTO = {firstname , lastname , email , phone , password}

            const {user , accessToken , refreshToken} = 
            await this.registerUser.execute(userData)
            res.status(200).json({
                success:true,
                message: "User registered successfully", 
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone:user.phone,
                    email: user.email,
                    role: user.role,
                  },
                  accessToken,
                  refreshToken,
            })
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
}