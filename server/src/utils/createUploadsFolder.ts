import fs from 'fs';
import path from 'path';

export const uploadDir = path.join(__dirname, '..', 'uploads', 'singleImages');
export const createUploadsFolder = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Upload folder created at:', uploadDir);
  }
};