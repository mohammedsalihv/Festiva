import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export interface IAdminUserManagementController {
  getAllUsers(req: Request, res: Response): Promise<void>;
  blockOrUnblockUser(req: Request, res: Response): Promise<void>;
  editUser(req: Request, res: Response): Promise<void>;
  changeProfile(req: MulterRequest, res: Response): Promise<void>;
  deleteUser(req: Request, res: Response): Promise<void>;
}
