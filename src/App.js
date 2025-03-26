import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!image) return alert("Please upload an image");
    alert("Image submitted for processing!");
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <h1>Handwritten Digit Recognition</h1>
      <div className="upload-section">
        <div className="upload-options">
          <div className="upload-box">
            <label htmlFor="file-upload">Upload from Device</label>
            <input type="file" accept="image/*" id="file-upload" onChange={handleImageUpload} />
          </div>
          <div className="upload-box">
            <label htmlFor="camera-upload">Capture from Camera</label>
            <input type="file" accept="image/*" capture="camera" id="camera-upload" onChange={handleCameraCapture} />
          </div>
        </div>
      </div>
      {preview && <img src={preview} alt="Preview" className="preview-image" />}
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;