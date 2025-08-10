import { Response } from "express";
import { AuthRequest } from "../../common/authentication/authType";
import { JwtPayload } from "jsonwebtoken";

interface MulterRequest extends AuthRequest {
  file: Express.Multer.File;
}

export interface IUserProfileController {
  setProfilePic(req: MulterRequest, res: Response): Promise<void>;
  profileEdit(req: AuthRequest, res: Response): Promise<void>;
  validateMail(req: AuthRequest, res: Response): Promise<void>;
  passwordModify(req: AuthRequest, res: Response): Promise<void>;
  deleteProfile(req: AuthRequest, res: Response): Promise<void>;
}
