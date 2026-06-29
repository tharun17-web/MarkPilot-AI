import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import analyzeRoute from "./routes/analyzeRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analyzeRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 MarkPilot AI Backend Running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});