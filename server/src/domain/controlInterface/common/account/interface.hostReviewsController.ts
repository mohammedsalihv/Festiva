import { Request, Response } from "express";
import { authenticationRequest } from "../authentication/authRequest";

export interface IHostReviewsController {
  allReviews(req: authenticationRequest, res: Response): Promise<void>;
}
