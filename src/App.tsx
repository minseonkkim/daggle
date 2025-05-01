import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./stores/authStore";

function RootRedirect() {
  const { isLoggedIn } = useAuthStore();
  return <Navigate to={isLoggedIn ? "/" : "/login"} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
