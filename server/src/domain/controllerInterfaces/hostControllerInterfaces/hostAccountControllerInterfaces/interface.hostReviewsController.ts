import {Response } from "express";
import { authenticationRequest } from "../../baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";

export interface IHostReviewsController {
  allReviews(req: authenticationRequest, res: Response): Promise<void>;
}
