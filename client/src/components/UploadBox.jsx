import { useRef, useState } from "react";
import {
  FiUploadCloud,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";

import toast from "react-hot-toast";

import StudentCard from "./StudentCard";
import SubjectTable from "./SubjectTable";
import StatsCards from "./StatsCards";
import SearchStudent from "./SearchStudent";
import StudentList from "./StudentList";

import api from "../services/api";
import LoadingOverlay from "./LoadingOverlay";

function UploadBox() {
  const [file, setFile] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAnalyze = async (e) => {
    e.stopPropagation();

    if (!file || loading) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("marksheet", file);

      const response = await api.post(
        "/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const parsedData = JSON.parse(response.data.data);

      setStudentData(parsedData);

      toast.success("AI Analysis Completed!");

    } catch (error) {

      console.error(error);

      toast.error("Backend Analysis Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
    {loading && <LoadingOverlay />}
      <div
        className="upload-box"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          hidden
          ref={inputRef}
          onChange={handleChange}
        />

        {!file ? (
          <>
            <FiUploadCloud className="upload-icon" />

            <h3>Upload Your Marksheet</h3>

            <p>
              Drag & Drop your PDF or Image here
            </p>

            <span>
              PDF • JPG • JPEG • PNG
            </span>
          </>
        ) : (
          <>
            <FiFileText className="upload-icon" />

            <h3 className="filename">
              {file.name}
            </h3>

            <div className="file-status">
              <FiCheckCircle />
              <span>Ready to Analyze</span>
            </div>

            <button
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading
                ? "🤖 AI Processing..."
                : "🚀 Analyze Marksheet"}
            </button>
          </>
        )}
      </div>

      {studentData && (
        <>
          {/* <StatsCards subjects={studentData.subjects} /> */}

          <StudentCard student={studentData} />

          <SubjectTable
            student={studentData}
            subjects={studentData.subjects}
          />

          <SearchStudent />

          
        </>
      )}
    </>
  );
}

export default UploadBox;