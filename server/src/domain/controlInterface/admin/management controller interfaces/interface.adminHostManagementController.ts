import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export interface IAdminHostManagementController {
  getAllHosts(req: Request, res: Response): Promise<void>;
  blockOrUnblockHost(req: Request, res: Response): Promise<void>;
  editHost(req: Request, res: Response): Promise<void>;
  changeProfile(req: MulterRequest, res: Response): Promise<void>;
  deleteHost(req: Request, res: Response): Promise<void>;
}
