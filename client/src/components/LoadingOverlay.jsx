import "./LoadingOverlay.css";

function LoadingOverlay() {
  return (
    <div className="loading-overlay">

      <div className="loading-card">

        <div className="ai-icon">
          🤖
        </div>

        <h1>MarkPilot AI</h1>

        <h3>Analyzing Your Marksheet</h3>

        <p>Please wait while AI extracts student information...</p>

        <div className="loader"></div>

        <div className="loading-steps">

          <p>📄 Reading PDF...</p>

          <p>🧠 Extracting Student Information...</p>

          <p>📚 Processing Subject Details...</p>

          <p>☁️ Preparing Dashboard...</p>

        </div>

      </div>

    </div>
  );
}

export default LoadingOverlay;