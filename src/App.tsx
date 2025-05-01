import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import DefaultLayout from "./layouts/DefaultLayout";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <DefaultLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </DefaultLayout>
  );
}

export default App;
