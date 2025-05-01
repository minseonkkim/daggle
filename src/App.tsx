import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./stores/authStore";

function App() {
  const { isLoggedIn } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
