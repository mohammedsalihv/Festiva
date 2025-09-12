import CustomError from "../../baseUtilities/errors/CustomError";
import { statusCodes } from "../../baseUtilities/messages/constantResponses";

export const assetFilesValidate = async ({
  files,
  typeOfAsset,
}: {
  files: Express.Multer.File[];
  typeOfAsset: string;
}): Promise<boolean> => {
  if (!files?.length) {
    throw new CustomError("No files uploaded", statusCodes.forbidden);
  } else if (!["venue", "studio", "rentcar", "caters"].includes(typeOfAsset)) {
    throw new CustomError("Invalid asset type", statusCodes.forbidden);
  }

  return true;
};
