
import cloudinary from "../../../config/cloudinary";

export const cloudinaryUploader = ({
  folderPath,
  buffer,
  filename,
}: {
  folderPath: string;
  buffer: Buffer;
  filename?: string;
}): Promise<{ url: string; public_id: string }> => {
  const public_id = filename || `${Date.now()}`;
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderPath, public_id },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    stream.end(buffer);
  });
};


