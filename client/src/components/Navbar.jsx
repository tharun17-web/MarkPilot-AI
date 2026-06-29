import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

      await signOut(auth);

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Logout Failed");

    }
  };

  return (
    <nav className="navbar">

      <div className="logo">
        MarkPilot AI
      </div>

      <ul className="nav-links">
        <li>Dashboard</li>
        <li>Students</li>
        <li>Reports</li>
      </ul>

      <button
        className="faculty-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;