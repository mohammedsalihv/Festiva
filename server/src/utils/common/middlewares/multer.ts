import multer from "multer";
import CustomeError from "../errors/CustomError";

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new CustomeError("Only JPG/PNG images are allowed", 415));
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const multipleImageUpload = upload.fields([
  { name: "Images", maxCount: 10 },
]);
export const singleImageUpload = upload.single("file");
