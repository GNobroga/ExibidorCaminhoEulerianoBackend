import path from 'path';
import multer from 'multer';

export default {
  directory: path.resolve('uploads'),
  storage: multer.diskStorage({
    destination: path.resolve('uploads'),
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
};