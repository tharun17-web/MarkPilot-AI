import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import FacultyDashboard from "./pages/FacultyDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <FacultyDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;