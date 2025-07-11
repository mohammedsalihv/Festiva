import { Request, Response } from "express";

export interface IHostVenueController {
  addVenueService(req: Request, res: Response): Promise<void>;
}
