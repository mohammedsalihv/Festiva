import { cloudinaryUploader } from "./cloudinaryUploader";

export const uploadProfileImage = ({
  id,
  buffer,
  filename,
}: {
  id: string;
  buffer: Buffer;
  filename?: string;
}): Promise<{ public_id: string }> => {
  const folderPath = `Festiva/profile_images/${id}`;
  const customFilename = filename || `image_${id}_${Date.now()}`;
  return cloudinaryUploader({ folderPath, buffer, filename: customFilename });
};
