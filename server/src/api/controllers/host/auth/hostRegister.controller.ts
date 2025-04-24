import { Request , Response } from "express";
import { RegisterHostDTO } from "../../../../config/DTO/hostDto";
import { RegsiterHost } from "../../../../application/use-cases/host/Auth/registerHost";

export class HostRegisterController{
    constructor(private registerHost : RegsiterHost) {}

   async hostRegister(req:Request , res:Response) : Promise<void>{
      try {
        const {name ,  email , phone , password , location} = req.body
        const hostData: RegisterHostDTO = {name , email , phone , password , location}

        const {host , accessToken , refreshToken} = await this.registerHost.execute(hostData)
        res.status(200).json({
            success:true,
            message: "Registered successfully", 
            host: {
                id: host.id,
                firstname: host.name,
                phone:host.phone,
                email: host.email,
                role: host.role,
              },
              accessToken,
              refreshToken,
        })
      } catch (error:any) {
        res.status(500).json({ message: error.message });
      }
    }
}