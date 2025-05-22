import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AttendanceDashboardPage() {
  const navigate = useNavigate();
  const cards = [
    {
      key: "mark",
      icon: "📝",
      title: "Mark Attendance",
      desc: "Instantly record attendance using AI-powered OCR. Fast, accurate, and effortless — say goodbye to manual registers!",
      route: "/mark-attendance"
    },
    {
      key: "report",
      icon: "📅",
      title: "Monthly Summarizer",
      desc: "Get beautiful, actionable attendance reports. Track trends, boost engagement, and make data-driven decisions.",
      route: "/monthly-summary"
    },
    {
      key: "ai",
      icon: "🤖",
      title: "AttendIQ", 
      desc: "Leverage AI analytics to detect irregularities and ensure data integrity. Smarter, safer insights at your fingertips.", 
      route: "/attendiq"
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="dashboard-logo">RegisAi</h1>
        <button
          className="need-help-btn"
          onClick={() => navigate("/help")}
        >
          Need help?
        </button>
      </header>

      {/* Welcome Message */}
      <section className="dashboard-greeting">
        <h2 style={{ fontSize: "2.5rem", color: "#4a4ae6", fontWeight: "bold" }}>Hey User 👋</h2>
        <p style={{ fontSize: "1.3rem", color: "#fff", marginBottom: "1.5rem" }}>
          Welcome to <span style={{ color: "#f55c47", fontWeight: 600 }}>RegisAi</span> — your smart attendance and analytics assistant!
        </p>
      </section>

      {/* Dashboard Cards */}
      <div className="dashboard-cards big-cards">
        {cards.map(card => (
          <div
            className={`dashboard-card ${card.key}`}
            key={card.key}
            onClick={() => navigate(card.route)}
          >
            <div className="card-icon" style={{ fontSize: "3rem" }}>{card.icon}</div>
            <h3 style={{ fontSize: "1.7rem" }}>{card.title}</h3>
            <p style={{ fontSize: "1.15rem" }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendanceDashboardPage;
