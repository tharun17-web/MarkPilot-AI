import UploadBox from "./UploadBox";
import { FaRobot, FaDatabase, FaFileExcel, FaSearch } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-badge">
        🚀 AI Powered Result Management System
      </div>

      <h1>MarkPilot AI</h1>

      <h2>
        Transform Academic Result Processing
        <br />
        with Artificial Intelligence
      </h2>

      <p>
        Upload semester marksheets using OCR + AI and automatically
        extract student information in seconds.
      </p>

      <div className="hero-features">

        <div className="feature">
          <FaRobot />
          <span>AI Analysis</span>
        </div>

        <div className="feature">
          <FaDatabase />
          <span>Firebase Storage</span>
        </div>

        <div className="feature">
          <FaSearch />
          <span>Quick Search</span>
        </div>

        <div className="feature">
          <FaFileExcel />
          <span>Excel Export</span>
        </div>

      </div>

      <UploadBox />

    </section>
  );
}

export default Hero;