import { Request, Response } from "express";

export interface IUserVenueController {
  getVenues(req: Request, res: Response): Promise<void>;
}
