import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignLogPage.css';

function AttendanceDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-logo">RegisAi</h1>
        <button onClick={() => navigate("/profile")}> Profile </button>
      </header>

      {/* Welcome Message */}
      <section className="dashboard-greeting">
        <h2>Hey User 👋</h2>
        <p>Welcome back! What would you like to do today?</p>
      </section>

      {/* Dashboards Cards */}
      <div className="dashboard-cards">
        {/* Mark Attendance */}
        <div
          className="dashboard-card mark"
          onClick={() => navigate("/mark-attendance")}
        >
          <div className="card-icon">📝</div>
          <h3>Mark Attendance</h3>
          <p>Use OCR or camera to log attendance in real time.</p>
        </div>

        {/* Monthly Summarizer */}
        <div
          className="dashboard-card report"
          onClick={() => navigate("/monthly-summary")}
        >
          <div className="card-icon">📅</div>
          <h3>Monthly Summarizer</h3>
          <p>View detailed attendance summaries.</p>
        </div>

        {/* AI Anomaly */}
        <div
          className="dashboard-card ai"
          onClick={() => navigate("/ai-anomaly")}
        >
          <div className="card-icon">🤖</div>
          <h3>AI Anomaly</h3>
          <p>Detect irregularities using AI-based analysis.</p>
        </div>
      </div>
    </div>
  );
}

export default AttendanceDashboardPage;
