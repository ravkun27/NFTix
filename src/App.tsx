import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import CursorTrail from "./components/CursorTrail";
import TicketDashboard from "./components/TicketDashboard";

function App() {
  return (
    <BrowserRouter>
      <CursorTrail />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tickets" element={<TicketDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
