import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function AnalyticsCharts({ students }) {
  let pass = 0;
  let fail = 0;

  students.forEach((student) => {
    student.subjects?.forEach((subject) => {
      if (subject.result === "PASS")
        pass++;
      else
        fail++;
    });
  });

  const pieData = {
    labels: ["PASS", "FAIL / RA"],
    datasets: [
      {
        data: [pass, fail],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],
      },
    ],
  };

  const barData = {
    labels: students.map(
      (student) => student.studentName
    ),

    datasets: [
      {
        label: "Subjects",
        data: students.map(
          (student) =>
            student.subjects?.length || 0
        ),
        backgroundColor: "#2563eb",
      },
    ],
  };
  if (students.length === 0) {
  return (
    <div className="chart-card">

      <h2>📈 Analytics</h2>

      <p
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#64748b",
          fontSize: "18px",
        }}
      >
        Upload student records to generate analytics.
      </p>

    </div>
  );
}

  return (
    <div className="analytics-grid">

      <div className="chart-card">

        <h2>📊 Pass vs Fail</h2>

        <Pie data={pieData} />

      </div>

      <div className="chart-card">

        <h2>📈 Subjects per Student</h2>

        <Bar data={barData} />

      </div>

    </div>
  );
}

export default AnalyticsCharts;