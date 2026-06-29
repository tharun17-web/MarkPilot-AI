import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

function SubjectTable({ student, subjects }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(subjects || []);
  }, [subjects]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setRows(updated);
  };

  const exportExcel = () => {
    const worksheet = utils.json_to_sheet(rows);

    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "Results");

    writeFile(workbook, "Student_Result.xlsx");
  };

  const saveStudent = async () => {
    try {
      const q = query(
        collection(db, "students"),
        where("registerNumber", "==", student.registerNumber)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;

        await updateDoc(docRef, {
          studentName: student.studentName,
          registerNumber: student.registerNumber,
          dob: student.dob,
          subjects: rows,
          updatedAt: new Date(),
        });

        alert("✅ Existing Student Updated!");
      } else {
        await addDoc(collection(db, "students"), {
          studentName: student.studentName,
          registerNumber: student.registerNumber,
          dob: student.dob,
          subjects: rows,
          createdAt: new Date(),
        });

        alert("✅ New Student Saved!");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Save Failed");
    }
  };

  return (
    <div className="result-card">
      <h2>📚 Subject Details</h2>

      <table className="subject-table">
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>UE</th>
            <th>IA</th>
            <th>Total</th>
            <th>Result</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((subject, index) => (
            <tr key={index}>
              <td>{subject.subjectCode}</td>

              <td>
                <input
                  type="text"
                  value={subject.ue || ""}
                  onChange={(e) =>
                    handleChange(index, "ue", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={subject.ia || ""}
                  onChange={(e) =>
                    handleChange(index, "ia", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={subject.total || ""}
                  onChange={(e) =>
                    handleChange(index, "total", e.target.value)
                  }
                />
              </td>

              <td>
                <span
                  className={
                    subject.result?.toUpperCase() === "PASS"
                      ? "pass-badge"
                      : "fail-badge"
                  }
                >
                  {subject.result}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="save-btn" onClick={saveStudent}>
        💾 Save Changes
      </button>

      <button className="save-btn" onClick={exportExcel}>
        📥 Export Excel
      </button>
    </div>
  );
}

export default SubjectTable;