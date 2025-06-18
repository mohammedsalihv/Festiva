import CustomError from "../common/errors/CustomError";
import { statusCodes } from "../common/messages/constantResponses";

export const assetFilesValidate = async ({
  files,
  typeOfAsset,
}: {
  files: Express.Multer.File[];
  typeOfAsset: string;
}): Promise<boolean> => {
  if (!files?.length || !['venue', 'studio', 'rentcar', 'caters'].includes(typeOfAsset)) {
    throw new CustomError('Invalid asset type or no files uploaded', statusCodes.forbidden);
  }

  return true;
};
