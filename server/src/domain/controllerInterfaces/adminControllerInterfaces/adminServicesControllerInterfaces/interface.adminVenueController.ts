import { Request, Response } from "express";

export interface IAdminVenueController {
  venueFullDetails(req: Request, res: Response): Promise<void>;
}
