import { Request, Response } from "express";
import { authenticationRequest } from "../authentication/authRequest";

export interface IHostAssetController {
  allAssets(req: authenticationRequest, res: Response): Promise<void>;
  findAssetDetails(req: authenticationRequest, res: Response): Promise<void>;
  getAllRequests(req: authenticationRequest, res: Response): Promise<void>;
  reSubmit(req: authenticationRequest, res: Response): Promise<void>;
  unavailableAsset(req: authenticationRequest, res: Response): Promise<void>;
  deleteAsset(req: authenticationRequest, res: Response): Promise<void>;
}
