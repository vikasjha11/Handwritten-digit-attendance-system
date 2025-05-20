import React from "react";
import "./WelcomePage.css";

function KnowMorePage() {
  return (
    <div className="container" style={{ maxWidth: 900, marginTop: 60 }}>
      <h2 style={{ color: "#1976d2" }}>Why Regis.AI?</h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Regis.AI is transforming the way attendance is managed in schools, colleges, and businesses. Our AI-powered handwritten attendance system is fast, accurate, and effortless.
      </p>
      <div className="main-content">
        <div className="tagline" style={{ maxWidth: 400 }}>
          <h3>Features:</h3>
          <ul style={{ fontSize: "1.1rem", textAlign: "left" }}>
            <li>✔️ Upload handwritten sheets, get digital attendance instantly</li>
            <li>✔️ No manual entry, no errors</li>
            <li>✔️ Works for teachers, students, and admins</li>
            <li>✔️ Secure, private, and easy to use</li>
            <li>✔️ Analytics and reporting for better insights</li>
          </ul>
          <p style={{ marginTop: "1.5rem", color: "#f55c47", fontWeight: 600 }}>
            Join 10,000+ users who trust Regis.AI for their attendance needs!
          </p>
        </div>
        <div className="featured-images" style={{ maxWidth: 400 }}>
          <img src="/face1.jpg" alt="AI Attendance Example 1" />
          <img src="/face2.jpg" alt="AI Attendance Example 2" />
        </div>
      </div>
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button style={{ background: "#1976d2", color: "#ffff" }} onClick={() => window.location.href = "/"}>Back to Home</button>
      </div>
    </div>
  );
}

export default KnowMorePage;