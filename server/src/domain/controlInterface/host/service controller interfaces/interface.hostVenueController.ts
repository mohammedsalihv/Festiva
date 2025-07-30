import { Request, Response } from "express";

export interface IHostVenueController {
  addVenueService(req: Request, res: Response): Promise<void>;
  venueFullDetails(req: Request, res: Response): Promise<void>;
  requestReApproval(req: Request, res: Response): Promise<void>;
  Unavailable(req: Request, res: Response): Promise<void>;
  deleteRequest(req: Request, res: Response): Promise<void>;
}
