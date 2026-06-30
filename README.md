# MarkPilot AI

**AI-Powered University of Madras Marksheet Analyzer**

MarkPilot AI is a full-stack web application that automates the extraction, analysis, and management of University of Madras marksheets using OCR and Google Gemini AI.

The system eliminates manual data entry by converting uploaded PDF or image marksheets into structured student records that can be edited, stored, searched, and exported.

---

## Live Demo

**Frontend:** https://mark-pilot-80xzfh1mk-tharun17-webs-projects.vercel.app/

---

## Features

* Upload PDF or Image marksheets
* OCR-based text extraction
* Google Gemini AI converts OCR text into structured JSON
* Student information dashboard
* Editable subject marks table
* Search student records
* Firebase Firestore integration
* Dashboard statistics
* Analytics charts
* Excel export
* Responsive design

---

## System Workflow

```text
Marksheet (PDF / Image)
          │
          ▼
 OCR (Tesseract.js)
          │
          ▼
 Google Gemini AI
          │
          ▼
 Structured JSON
          │
          ▼
 React Dashboard
          │
          ├────────► Firebase Firestore
          │
          └────────► Excel Export
```

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* Chart.js
* React Icons

### Backend

* Node.js
* Express.js
* Google Gemini AI
* Tesseract.js
* Multer

### Database

* Firebase Firestore

---

## Project Structure

```text
MarkPilot-AI
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/tharun17-web/MarkPilot-AI.git
```

Frontend

```bash
cd client
npm install
npm run dev
```

Backend

```bash
cd server
npm install
npm start
```

Create a `.env` file inside the `server` folder.

```env
GEMINI_API_KEY=YOUR_API_KEY
```

---

## Screenshots

Add screenshots of:

* Login Page
* Dashboard
* Upload Section
* AI Analysis Result
* Student Table
* Analytics Dashboard

---

## Future Enhancements

* Faculty Authentication
* Bulk Marksheet Upload
* Admin Dashboard
* Multi-University Support
* Student Result Analytics
* AI Error Detection
* Cloud Backend Deployment

---

## Problem Statement

Manual marksheet entry is slow, repetitive, and prone to errors.

MarkPilot AI automates the extraction and organization of examination data, reducing manual effort and improving accuracy for faculty members.

---

## Author

**Tharun**

If you found this project useful, consider starring the repository.
