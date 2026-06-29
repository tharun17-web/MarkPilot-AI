import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import AnalyticsCharts from "../components/AnalyticsCharts";
import UploadBox from "../components/UploadBox";
import StudentList from "../components/StudentList";

import useStudents from "../hooks/useStudents";

function FacultyDashboard() {

  const {
    students,
    reloadStudents,
  } = useStudents();

  return (
    <>
      <Navbar />

      <div
        style={{
          marginTop: "90px",
          paddingBottom: "80px",
        }}
      >
        <DashboardHeader />

        <DashboardStats students={students} />

        <AnalyticsCharts students={students} />

        <UploadBox onDataChanged={reloadStudents} />

        <StudentList
          students={students}
          reloadStudents={reloadStudents}
        />
      </div>
    </>
  );
}

export default FacultyDashboard;