import multer from 'multer';
import path from 'path';
import CustomeError from '../errors/CustomError';
import { createUploadsFolder, uploadDir } from '../general/createUploadsFolder';

createUploadsFolder();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new CustomeError('Only JPG/PNG images are allowed', 415));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const singleImageUpload = upload.single('file');
export const multipleImageUpload = upload.array('Images', 10);  