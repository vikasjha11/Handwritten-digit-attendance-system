// src/pages/WelcomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Regis.AI Logo" />
          <span>Regis.AI</span>
        </div>
        <div className="auth-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </header>

      <main className="main-content">
        <div className="tagline">
          <h2>Revolutionizing Attendance with Intelligence</h2>
          <p>From Pen To Presence. Seamless check-ins. Face the future.</p>
         <button onClick={() => navigate("/login")}> Get Started → </button>

        </div>

        <div className="featured-images">
          <img src="/face1.jpg" alt="Sample Face 1" />
          <img src="/face2.jpg" alt="Sample Face 2" />
          <img src="/face3.jpg" alt="Sample Face 3" />
          <img src="/face4.jpg" alt="Sample Face 4" />
        </div>
      </main>
    </div>
  );
}

export default WelcomePage;
