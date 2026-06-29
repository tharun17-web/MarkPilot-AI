import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const convertOCRToJSON = async (ocrText) => {

  const prompt = `
You are an AI that extracts structured data from University of Madras examination results.

Your task is to read the OCR text and return ONLY valid JSON.

IMPORTANT RULES:

- Return ONLY JSON.
- Do not add explanations.
- Do not use markdown.
- Do not skip any subject.
- Preserve leading zeros in marks.
- Preserve subject codes exactly.
- If Result is PASS, FAIL, RA or AAA, preserve it exactly.
- If any value is missing, use an empty string "".

The OCR text contains a table in this format:

Subject Code UE IA Total Result

Example:

100L1A 041 025 066 PASS
100L1Z 045 021 066 PASS
120C1A 015 023 038 RA

Each row MUST become one object inside the subjects array.

Return EXACTLY this JSON structure:

{
  "studentName": "",
  "registerNumber": "",
  "dob": "",
  "subjects": [
    {
      "subjectCode": "",
      "ue": "",
      "ia": "",
      "total": "",
      "result": ""
    }
  ]
}

OCR TEXT:

${ocrText}
`;
console.log("========== GEMINI PROMPT ==========");
console.log(prompt);

  const result = await model.generateContent(prompt);
  
  return result.response.text();

};