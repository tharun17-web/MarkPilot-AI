import {
  FaBookOpen,
  FaCalculator,
  FaTrophy,
} from "react-icons/fa";

function StatsCards({ subjects }) {
  const totalSubjects = subjects.length;

  const totalMarks = subjects.reduce(
    (sum, subject) => sum + Number(subject.total || 0),
    0
  );

  const allPassed = subjects.every(
    (subject) => subject.result?.toUpperCase() === "PASS"
  );

  return (
    <section className="stats-section">

      <h2 className="section-title">
        📊 Dashboard Overview
      </h2>

      <div className="stats-container">

        <div className="stat-card">

          <div className="stat-icon blue">
            <FaBookOpen />
          </div>

          <h4>Total Subjects</h4>

          <h1>{totalSubjects}</h1>

          <p>Subjects Processed</p>

        </div>

        <div className="stat-card">

          <div className="stat-icon orange">
            <FaCalculator />
          </div>

          <h4>Total Marks</h4>

          <h1>{totalMarks}</h1>

          <p>Overall Score</p>

        </div>

        <div className="stat-card">

          <div className="stat-icon green">
            <FaTrophy />
          </div>

          <h4>Result Status</h4>

          <h1>{allPassed ? "PASS" : "FAIL"}</h1>

          <p>
            {allPassed
              ? "Excellent Performance"
              : "Needs Improvement"}
          </p>

        </div>

      </div>

    </section>
  );
}

export default StatsCards;