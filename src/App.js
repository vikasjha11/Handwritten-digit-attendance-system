import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import HelpPage from "./pages/HelpPage";
import KnowMorePage from "./pages/KnowMorePage";
import AttendanceDashboardPage from './pages/Workplace.js';
import MarkAttendancePage from './pages/MarkAttendancePage.js';
import DevelopersPage from "./pages/DevelopersPage";
import MonthlySummarizerPage from './pages/MonthlySummarizerPage';
import AiAnomalyPage from './pages/AttendIQPage.js';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/know-more" element={<KnowMorePage />} />
        <Route path="/Workplace" element={<AttendanceDashboardPage />} />       
        <Route path="/mark-attendance" element={<MarkAttendancePage />} />
        <Route path="/monthly-summary" element={<MonthlySummarizerPage />} />
        <Route path="/attendiq" element={<AiAnomalyPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
