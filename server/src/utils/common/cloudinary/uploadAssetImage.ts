import { cloudinaryUploader } from "./cloudinaryUploader";

export const uploadAssetImages = ({
  assetType,
  buffer,
  filename,
}: {
  assetType: "venue" | "studio" | "rentcar" | "caters";
  buffer: Buffer;
  filename?: string;
}): Promise<{ url: string; public_id: string }> => {
  const folderPath = `Festiva/assets_images/${assetType}`;
  return cloudinaryUploader({ folderPath, buffer, filename });
};