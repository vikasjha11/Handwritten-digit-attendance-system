import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function MarkAttendancePage() {
  const [form, setForm] = useState({
    className: "",
    section: "",
    date: "",
  });
  const [image, setImage] = useState(null);
  const [rollNumbers, setRollNumbers] = useState([]);
  const [extractedText, setExtractedText] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(""); 
  const [attendanceMsg, setAttendanceMsg] = useState("");
  const [msgCopied, setMsgCopied] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !form.className || !form.section || !form.date) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const data = new FormData();
    data.append("file", image);
    // Remove these lines if not needed by backend:
    // data.append("className", form.className);
    // data.append("section", form.section);
    // data.append("date", form.date);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/upload", data);

      if (res.data.status === 'success') {
        const digits = [];
        const texts = [];
        (res.data.rollNumbers || []).forEach(item => {
          if (/^\d+$/.test(item)) {
            digits.push(item);
          } else {
            texts.push(item);
          }
        });
        setRollNumbers(digits);
        setExtractedText(texts);
        setError("");
      } else {
        setError(res.data.error || "Failed to process the image.");
        setRollNumbers([]);
        setExtractedText([]);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to extract roll numbers.");
      setRollNumbers([]);
      setExtractedText([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (type) => {
    let textToCopy = "";
    if (type === "rollNumbers") {
      textToCopy = rollNumbers.join(", ");
    } else {
      textToCopy = extractedText.join("\n");
    }
    navigator.clipboard.writeText(textToCopy);
    setCopied(type);
    setTimeout(() => setCopied(""), 1500);
  };

  const handleCopyMsg = () => {
    navigator.clipboard.writeText(attendanceMsg);
    setMsgCopied(true);
    setTimeout(() => setMsgCopied(false), 1500);
  };

  const generateAttendanceMessage = () => {
    if (!form.className || !form.section || !form.date) {
      setAttendanceMsg("Please fill all the details first.");
      return;
    }
    if (rollNumbers.length === 0 && extractedText.length === 0) {
      setAttendanceMsg("No students found. Please extract roll numbers or names first.");
      return;
    }
    const formattedDate = new Date(form.date).toLocaleDateString();
    let students = "";
    if (rollNumbers.length > 0) {
      students += rollNumbers.join(", ");
    }
    if (extractedText.length > 0) {
      if (students) students += ", ";
      students += extractedText.join(", ");
    }
    const msg = `Attendance for Class ${form.className}, Section ${form.section} on ${formattedDate}:\nThe following students are present: ${students}`;
    setAttendanceMsg(msg);
  };

  return (
    <div className="mark-container">
      <h2>Mark Attendance via OCR</h2>
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
          type="date"
          name="date"
          value={form.date}
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
          {loading ? "Processing..." : "Upload & Extract"}
        </button>
      </form>

      {error && (
        <div className="error-box">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}

      {loading && (
        <div className="processing-caption" style={{ textAlign: "center", margin: "1.5rem 0", color: "#4a4ae6", fontWeight: 500 }}>
          Please wait while we process your image. This may take a few moments.
        </div>
      )}

      {(rollNumbers.length > 0 || extractedText.length > 0) && (
        <>
          <div className="summary-bar">
            <span>
              <strong>Class:</strong> {form.className}
            </span>
            <span>
              <strong>Section:</strong> {form.section}
            </span>
            <span>
              <strong>Date:</strong> {form.date}
            </span>
          </div>
          <div className="parallel-results-container">
            {rollNumbers.length > 0 && (
              <div className="result-box roll-box">
                <div className="result-header">
                  <h3>Extracted Roll Numbers</h3>
                  <button className="copy-btn" onClick={() => handleCopy("rollNumbers")}>Copy</button>
                  {copied === "rollNumbers" && <span className="copied-msg">Copied!</span>}
                </div>
                <ul>
                  {rollNumbers.map((number, index) => (
                    <li key={index}>{number}</li>
                  ))}
                </ul>
              </div>
            )}
            {extractedText.length > 0 && (
              <div className="result-box text-box">
                <div className="result-header">
                  <h3>Extracted Text</h3>
                  <button className="copy-btn" onClick={() => handleCopy("text")}>Copy</button>
                  {copied === "text" && <span className="copied-msg">Copied!</span>}
                </div>
                <ul>
                  {extractedText.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="action-btns-row">
            <a
              href="https://student.gehu.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="gehu-erp-btn"
            >
              Directly Mark On GEHU ERP
            </a>
            <button
              className="gehu-erp-btn"
              onClick={generateAttendanceMessage}
              type="button"
            >
              Generate Attendance Message
            </button>
          </div>
          {attendanceMsg && (
            <div className="result-box attendance-msg-box">
              <div className="result-header">
                <h3>Attendance Message</h3>
                <button className="copy-btn" onClick={handleCopyMsg}>Copy</button>
                {msgCopied && <span className="copied-msg">Copied!</span>}
              </div>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: "1.05rem", color: "#222", background: "none", border: "none", margin: 0 }}>
                {attendanceMsg}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MarkAttendancePage;
