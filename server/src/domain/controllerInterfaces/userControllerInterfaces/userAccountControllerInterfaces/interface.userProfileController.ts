import { Response } from "express";
import { authenticationRequest } from "../../baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";
import { AuthRequest } from "../../baseControllerInterfaces/baseAuthenticationInterfaces/authType";

interface MulterRequest extends AuthRequest {
  file: Express.Multer.File;
}

export interface IUserProfileController {
  setProfilePic(req: MulterRequest, res: Response): Promise<void>;
  profileEdit(req: authenticationRequest, res: Response): Promise<void>;
  validateMail(req: authenticationRequest, res: Response): Promise<void>;
  passwordModify(req: authenticationRequest, res: Response): Promise<void>;
  deleteProfile(req: authenticationRequest, res: Response): Promise<void>;
}
