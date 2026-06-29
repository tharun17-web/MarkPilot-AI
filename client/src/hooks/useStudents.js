import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function useStudents() {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "students"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return {
    students,
    reloadStudents: loadStudents,
  };
}

export default useStudents;