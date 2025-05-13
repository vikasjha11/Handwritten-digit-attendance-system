import React, { useState } from "react";
import axios from "axios";
import './SignLogPage.css';

function MarkAttendancePage() {
  const [form, setForm] = useState({
    className: "",
    section: "",
    date: "",
  });
  const [image, setImage] = useState(null);
  const [rollNumbers, setRollNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    data.append("className", form.className);
    data.append("section", form.section);
    data.append("date", form.date);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/upload", data);
      
      // Check the backend response and handle errors
      if (res.data.status === 'success') {
        setRollNumbers(res.data.rollNumbers || []);
        setError("");  // Clear any previous errors
      } else {
        setError(res.data.error || "Failed to process the image.");
        setRollNumbers([]);  // Clear any previously displayed roll numbers
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to extract roll numbers.");
      setRollNumbers([]);
    } finally {
      setLoading(false);
    }
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

      {rollNumbers.length > 0 && (
        <div className="result-box">
          <h3>Extracted Roll Numbers</h3>
          <ul>
            {rollNumbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MarkAttendancePage;
