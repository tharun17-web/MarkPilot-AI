import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import axios from "axios";
import FormData from "form-data";

export const extractText = async (filePath) => {
  try {
    const extension = path.extname(filePath).toLowerCase();

    // ================= PDF =================
    if (extension === ".pdf") {
      console.log("📄 PDF detected");

      const dataBuffer = fs.readFileSync(filePath);

      const pdfData = await pdfParse(dataBuffer);

      return pdfData.text;
    }

    // ================= IMAGE =================
    console.log("🖼 Image detected");

    const formData = new FormData();

    formData.append("apikey", process.env.OCR_SPACE_API_KEY);
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");
    formData.append("file", fs.createReadStream(filePath));

    const response = await axios.post(
      "https://api.ocr.space/parse/image",
      formData,
      {
        headers: formData.getHeaders(),
        maxBodyLength: Infinity,
      }
    );

    const result = response.data;

    if (result.IsErroredOnProcessing) {
      throw new Error(result.ErrorMessage.join(", "));
    }

    return result.ParsedResults[0].ParsedText;

  } catch (error) {
    console.error("OCR Service Error:", error);
    throw error;
  }
};