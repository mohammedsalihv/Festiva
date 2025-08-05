import { v2 as cloudinary } from "cloudinary";

export const getSignedImageUrl = (
  public_id: string,
  transformation = { width: 300, height: 300, crop: "fill" },
  expiresInSeconds = 600
): string => {
  const timestamp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  return cloudinary.url(public_id, {
    type: "authenticated",
    sign_url: true,
    secure: true,
    transformation,
    timestamp,
  });
};
