import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { FaTrashAlt, FaUsers } from "react-icons/fa";

function StudentList() {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "students"));

      const data = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "students", id));

      alert("✅ Student Deleted!");

      loadStudents();
    } catch (error) {
      console.error(error);

      alert("❌ Delete Failed");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="result-card">

      <h2>
        <FaUsers /> All Students
      </h2>

      {students.length === 0 ? (

        <div className="empty-state">
          No students available.
        </div>

      ) : (

        <table className="subject-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Register No</th>
              <th>DOB</th>
              <th>Subjects</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {students.map((student) => (

              <tr key={student.id}>

                <td>{student.studentName || "-"}</td>

                <td>{student.registerNumber || "-"}</td>

                <td>{student.dob || "-"}</td>

                <td>{student.subjects?.length || 0}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteStudent(student.id)
                    }
                  >
                    <FaTrashAlt />
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default StudentList;