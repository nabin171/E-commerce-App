// backend/middleware/multer.js
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // ✅ keep files in RAM (no local writes)
  limits: { fileSize: 20 * 1024 * 1024 }, // optional: 20MB per file
});

export default upload;
