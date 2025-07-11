import bcrypt from "bcrypt";
import logger from "../messages/logger";

export const hash = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.info(error);
    throw new Error("Error hashing password");
  }
};
