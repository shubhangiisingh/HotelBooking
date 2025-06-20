// server/middlewares/multer.js
import multer from "multer";

const storage = multer.memoryStorage(); // Use diskStorage if you want files saved to server

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit to 5MB per file
});

export default upload;
