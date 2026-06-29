import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import {
  FaSearch,
  FaUserGraduate,
  FaIdCard,
  FaBirthdayCake,
} from "react-icons/fa";

function SearchStudent() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [student, setStudent] = useState(null);

  const searchStudent = async () => {
    try {
      const q = query(
        collection(db, "students"),
        where("registerNumber", "==", registerNumber)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("❌ Student Not Found");
        setStudent(null);
        return;
      }

      setStudent(snapshot.docs[0].data());

      alert("✅ Student Found!");
    } catch (error) {
      console.error(error);
      alert("Search Failed");
    }
  };

  return (
    <div className="result-card">

      <h2>🔍 Search Student</h2>

      <div className="search-box">

        <input
  type="text"
  placeholder="Enter Register Number..."
  value={registerNumber}
  onChange={(e) => setRegisterNumber(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      searchStudent();
    }
  }}
/>

        <button
          className="save-btn"
          onClick={searchStudent}
        >
          <FaSearch />
          Search
        </button>

      </div>

      {student && (

        <div className="search-result">

          <div className="search-item">

            <FaUserGraduate />

            <div>
              <h4>Name</h4>
              <p>{student.studentName}</p>
            </div>

          </div>

          <div className="search-item">

            <FaIdCard />

            <div>
              <h4>Register Number</h4>
              <p>{student.registerNumber}</p>
            </div>

          </div>

          <div className="search-item">

            <FaBirthdayCake />

            <div>
              <h4>Date of Birth</h4>
              <p>{student.dob}</p>
            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default SearchStudent;