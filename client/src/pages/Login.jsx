import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("❌ Invalid Email or Password");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="login-page">

      <form className="login-card" onSubmit={handleLogin}>

        <h1>MarkPilot AI</h1>

        <h3>Faculty Login</h3>

        <input
          type="email"
          placeholder="Faculty Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="save-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}

export default Login;