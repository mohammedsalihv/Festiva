import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { authenticationRequest } from "../../baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";
interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export interface IAdminHostManagementController {
  getAllHosts(req: authenticationRequest, res: Response): Promise<void>;
  blockOrUnblockHost(req: authenticationRequest, res: Response): Promise<void>;
  editHost(req: authenticationRequest, res: Response): Promise<void>;
  changeProfile(req: MulterRequest, res: Response): Promise<void>;
  deleteHost(req: authenticationRequest, res: Response): Promise<void>;
}
