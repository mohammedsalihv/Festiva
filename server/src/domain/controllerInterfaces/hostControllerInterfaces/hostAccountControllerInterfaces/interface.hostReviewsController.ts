import { Request, Response } from "express";
import { authenticationRequest } from "../baseAuthenticationInterfaces/authRequest";

export interface IHostReviewsController {
  allReviews(req: authenticationRequest, res: Response): Promise<void>;
}
