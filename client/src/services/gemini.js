import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function analyzeMarksheet(base64Image, mimeType) {
  const prompt = `
You are an AI that extracts academic results.

Analyze the uploaded university result.

Return ONLY valid JSON.

Format:

{
  "studentName":"",
  "registerNumber":"",
  "dob":"",
  "subjects":[
    {
      "subjectCode":"",
      "ue":"",
      "ia":"",
      "total":"",
      "result":""
    }
  ]
}

Do not return markdown.
Do not explain.
Return JSON only.
`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType,
        data: base64Image,
      },
    },
  ]);

  return result.response.text();
}