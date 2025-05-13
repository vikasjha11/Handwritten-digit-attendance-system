// frontend/src/pages/Dashboard.js

import React, { useEffect, useState } from "react";

function Dashboard() {
  const [summary, setSummary] = useState("Loading...");
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/analytics")
      .then((res) => res.json())
      .then((data) => setSummary(data.summary));

    fetch("http://localhost:5000/anomaly")
      .then((res) => res.json())
      .then((data) => setAnomalies(data.anomalies || []));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Attendance Dashboard</h2>
      <p>{summary}</p>

      <h3>🔍 Anomaly Detection</h3>
      <ul>
        {anomalies.map((a, i) => (
          <li key={i}>
            Roll {a.roll} - {a.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
