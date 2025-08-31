import { Response } from "express";
import { authenticationRequest } from "../../common/authentication/authRequest";
import { AuthRequest } from "../../common/authentication/authType";

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
