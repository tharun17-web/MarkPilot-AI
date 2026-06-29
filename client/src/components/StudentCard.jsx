import {
  FaUserGraduate,
  FaIdCard,
  FaBirthdayCake,
  FaCheckCircle,
} from "react-icons/fa";

function StudentCard({ student }) {
  return (
    <section className="result-card">

      <h2>🎓 Student Information</h2>

      <div className="student-grid">

        <div className="student-box">
          <div className="student-icon blue">
            <FaUserGraduate />
          </div>

          <h4>Name</h4>

          <p>{student.studentName || "—"}</p>
        </div>

        <div className="student-box">
          <div className="student-icon orange">
            <FaIdCard />
          </div>

          <h4>Register Number</h4>

          <p>{student.registerNumber || "—"}</p>
        </div>

        <div className="student-box">
          <div className="student-icon green">
            <FaBirthdayCake />
          </div>

          <h4>Date of Birth</h4>

          <p>{student.dob || "Not Found"}</p>
        </div>

      </div>

      <div className="verified-box">
        <FaCheckCircle />
        <span>Student Verified</span>
      </div>

    </section>
  );
}

export default StudentCard;