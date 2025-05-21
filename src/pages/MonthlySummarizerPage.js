import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function MonthlySummarizerPage() {
  const [form, setForm] = useState({
    className: "",section: "",month: "",debarPercent: 75,});
  const [image, setImage] = useState(null);
  const [detailedResults, setDetailedResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [debarMsg, setDebarMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !form.className || !form.section || !form.month || !form.debarPercent) {
      alert("Please fill all fields and upload an image.");
      return;
    }
    const data = new FormData();
    data.append("file", image);
    data.append("className", form.className);
    data.append("section", form.section);
    data.append("month", form.month);
    data.append("debarPercent", form.debarPercent);

    try {
      setLoading(true);
      setError("");
      setDebarMsg("");
      const res = await axios.post("http://localhost:5000/monthly-summary", data);

      if (res.data.status === 'success') {
        setDetailedResults(res.data.results || []);
        setError("");
      } else {
        setError(res.data.error || "Failed to process the image.");
        setDetailedResults([]);
      }
    } catch (err) {
      setError("Failed to process the register image.");
      setDetailedResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    setExporting(true);
    let csv = "Roll Number,Name,Attendance %,Status\n";
    detailedResults.forEach(row => {
      csv += `${row.roll},${row.name},${row.percent},${row.status}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_summary_${form.className}_${form.section}_${form.month}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setExporting(false);
  };

  const handleGenerateDebarMsg = () => {
    const debarred = detailedResults.filter(row => row.status === "Debarred");
    if (debarred.length === 0) {
      setDebarMsg("No students are debarred this month.");
      return;
    }
    const names = debarred.map(row => `${row.name} (Roll: ${row.roll})`).join(", ");
    const msg = `Dear Students,\n\nThe following students of Class ${form.className} Section ${form.section} have been debarred for the month of ${form.month} due to attendance below the required ${form.debarPercent}%:\n\n${names}\n\nPlease contact the academic office for further clarification.\n\nRegards,\nProfessor`;
    setDebarMsg(msg);
  };

  return (
    <div className="mark-container">
      <h2>
        Monthly Attendance Summarizer
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="className"
          placeholder="Class (e.g., 10)"
          value={form.className}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="section"
          placeholder="Section (e.g., A)"
          value={form.section}
          onChange={handleChange}
          required
        />
        <input
          type="month"
          name="month"
          value={form.month}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="debarPercent"
          placeholder="Debarred Criteria (%)"
          value={form.debarPercent}
          min={0}
          max={100}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Upload & Summarize"}
        </button>
      </form>

      {(form.className || form.section || form.month || form.debarPercent) && (
        <div className="summary-bar">
          <span><strong>Class:</strong> {form.className}</span>
          <span><strong>Section:</strong> {form.section}</span>
          <span><strong>Month:</strong> {form.month}</span>
          <span><strong>Debarred if &lt; </strong>{form.debarPercent}%</span>
        </div>
      )}

      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="processing-caption">
          Please wait while we process your image. This may take a few moments.
        </div>
      )}

      {detailedResults.length > 0 && (
        <>
          <div className="result-box">
            <table>
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Attendance %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {detailedResults.map((row, idx) => (
                  <tr key={idx} className={row.status === "Debarred" ? "debarred-row" : ""}>
                    <td>{row.roll}</td>
                    <td>{row.name}</td>
                    <td>{row.percent}</td>
                    <td className={row.status === "Debarred" ? "debarred-status" : "ok-status"}>
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="button-group">
            <button
              onClick={() => {
                const text = detailedResults.map(row =>
                  `Roll Number: ${row.roll}\nName: ${row.name}\nAttendance %: ${row.percent}\nStatus: ${row.status}`
                ).join('\n\n');
                navigator.clipboard.writeText(text);
              }}
              type="button"
            >
              Copy All
            </button>
            <button
              className="gehu-erp-btn"
              onClick={handleExport}
              disabled={exporting}
              type="button"
            >
              {exporting ? "Exporting..." : "Export Summary"}
            </button>
            <button
              className="gehu-erp-btn"
              onClick={handleGenerateDebarMsg}
              type="button"
            >
              Generate Debarred Message
            </button>
          </div>
          {debarMsg && (
            <div className="result-box debar-msg">
              <div className="result-header">
                <h3>Debarred Students Message</h3>
              </div>
              <pre>
                {debarMsg}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MonthlySummarizerPage;