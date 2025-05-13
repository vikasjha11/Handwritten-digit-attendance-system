// frontend/src/pages/UploadPage.js

import React, { useState } from "react";

function UploadPage() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResults(data.attendance || []);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Upload Classroom Image</h2>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload & Analyze</button>

      {results.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Attendance Results</h3>
          <ul>
            {results.map((r, i) => (
              <li key={i}>
                Roll {r.roll} - {r.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
