import { Response } from "express";
import { authenticationRequest } from "../../common/authentication/authRequest";

export interface IAdminLogoutController {
  logoutByAdmin(req: authenticationRequest, res: Response): Promise<Response>;
}
