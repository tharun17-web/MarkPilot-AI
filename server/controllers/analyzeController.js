import { extractText } from "../services/ocrService.js";
import { convertOCRToJSON } from "../services/geminiService.js";

export const analyzeController = async (req, res) => {
  try {
    console.log("========== NEW REQUEST ==========");

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("Running OCR...");

    const extractedText = await extractText(file.path);

    console.log("========== OCR RESULT ==========");
    console.log(extractedText);

    console.log("========== SENDING TO GEMINI ==========");

    const jsonResult = await convertOCRToJSON(extractedText);

// Remove markdown code fences
const cleanJson = jsonResult.replace(/```(?:json)?/gi, "").trim();

console.log("========== CLEAN JSON ==========");
console.log(cleanJson);

res.json({
  success: true,
  data: cleanJson,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};