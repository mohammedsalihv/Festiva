import { v2 as cloudinary } from "cloudinary";

interface UploadParams {
  folderPath: string;
  buffer: Buffer;
  filename: string;
}

export const cloudinaryUploader = ({
  folderPath,
  buffer,
  filename,
}: UploadParams): Promise<{ public_id: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: folderPath,
        public_id: filename,
        type: "authenticated",
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("No result from Cloudinary"));
        resolve({ public_id: result.public_id });
      }
    );

    uploadStream.end(buffer);
  });
};
