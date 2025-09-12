import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ParsedQs } from "qs";

export interface authenticationRequest extends Request<any, any, any, ParsedQs> {
  auth?: JwtPayload & { id: string; role?: string };
}
