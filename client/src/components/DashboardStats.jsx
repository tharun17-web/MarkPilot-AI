import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function DashboardStats({ students }) {
  const [stats, setStats] = useState({
    students: 0,
    subjects: 0,
    passPercent: 0,
    uploads: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const snapshot = await getDocs(collection(db, "students"));

      const students = snapshot.docs.map((doc) => doc.data());

      const totalStudents = students.length;

      let totalSubjects = 0;
      let passSubjects = 0;

      students.forEach((student) => {
        if (!student.subjects) return;

        totalSubjects += student.subjects.length;

        student.subjects.forEach((subject) => {
          if (subject.result === "PASS") {
            passSubjects++;
          }
        });
      });

      const passPercent =
        totalSubjects === 0
          ? 0
          : Math.round((passSubjects / totalSubjects) * 100);

      setStats({
        students: totalStudents,
        subjects: totalSubjects,
        passPercent,
        uploads: totalStudents,
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="stats-container">

      <div className="stat-card">
        <h3>👨‍🎓 Students</h3>
        <h1>{stats.students}</h1>
      </div>

      <div className="stat-card">
        <h3>📚 Subjects</h3>
        <h1>{stats.subjects}</h1>
      </div>

      <div className="stat-card">
        <h3>🏆 Pass %</h3>
        <h1>{stats.passPercent}%</h1>
      </div>

      <div className="stat-card">
        <h3>📄 Uploads</h3>
        <h1>{stats.uploads}</h1>
      </div>

    </div>
  );
}

export default DashboardStats;