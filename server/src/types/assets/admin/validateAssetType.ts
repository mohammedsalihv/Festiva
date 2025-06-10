import { Request, Response, NextFunction, RequestHandler } from "express";

export const validateAssetType: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const allowedTypes = ["all", "venues", "rentcar", "studio", "caters"];
  const type = req.params.typeOfAsset?.toLowerCase();
  console.log('====',type)
  if (!allowedTypes.includes(type)) {
    res.status(400).json({
      success: false,
      message: ` ${type} ,  Invalid asset type. Allowed types: ${allowedTypes.join(", ")}`,
    });
    return;
  }

  req.params.typeOfAsset = type;
  next();
};
