import express from "express";
import multer from "multer";
import path from "path";

import { analyzeController } from "../controllers/analyzeController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    cb(null, Date.now() + extension);
  },
});

const upload = multer({
  storage,
});

router.post(
  "/analyze",
  upload.single("marksheet"),
  analyzeController
);

export default router;