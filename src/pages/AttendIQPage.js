import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function AttendIQPage() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please upload a register image.");
      return;
    }
    setLoading(true);
    setError("");
    setResults([]);
    setAnalysis(null);

    const data = new FormData();
    data.append("file", image);

    try {
      const res = await axios.post("http://localhost:5000/ai-anomaly", data);
      if (res.data.status === "success") {
        setResults(res.data.students || []);
        setAnalysis(res.data.analysis || null);
      } else {
        setError(res.data.error || "Failed to analyze the image.");
      }
    } catch (err) {
      setError("Failed to analyze the register image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mark-container">
      <h2>AI Attendance Anomaly Detector</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Upload & Detect"}
        </button>
      </form>

      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="processing-caption">
          Please wait while we analyze your image. This may take a few moments.
        </div>
      )}

      {results.length > 0 && (
        <div className="result-box" style={{ marginTop: "2rem" }}>
          <h3>Detected Attendance Patterns</h3>
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Attendance %</th>
                <th>Prediction/Evaluation</th>
                <th>Need (%)</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => {
                let need = row.percent < 75 ? (75 - row.percent).toFixed(2) : "Safe";
                return (
                  <tr key={idx}>
                    <td>{row.roll}</td>
                    <td>{row.name}</td>
                    <td>{row.percent}</td>
                    <td>{row.anomaly}</td>
                    <td>{need}</td>
                    <td>{row.reason}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {analysis && (
        <div className="result-box" style={{ marginTop: "1.5rem", background: "#fff3e0", color: "#d84315", borderLeft: "5px solid #f55c47" }}>
          <div className="result-header">
            <h3>AI Insights</h3>
          </div>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "1.05rem", color: "#222", background: "none", border: "none", margin: 0 }}>
            {analysis}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AttendIQPage;