export function validateAndGetImageUrl(file: Express.Multer.File): string {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!file || !allowedMimeTypes.includes(file.mimetype)) {
    throw new Error("Invalid image file type");
  }

  return `uploads/singleImages/${file.filename}`;
}
