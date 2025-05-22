# Automated Attendance Tracking with Handwritten Digit Recognition

*Turning the old-school hustle of attendance into a seamless digital symphony.*

This project automates attendance tracking by recognizing handwritten roll numbers from attendance sheets using OCR technology. It merges the reliability of classic methods with cutting-edge AI to save time, cut errors, and modernize attendance management.

---

## 🚀 Project Overview

Manual attendance taking? That’s vintage but inefficient. This system steps in to digitize the process by:

- Using **EasyOCR** to read handwritten digits (roll numbers) from scanned or snapped attendance sheets.
- Offering a smooth user interface for quick image uploads.
- Applying smart preprocessing filters to sharpen image quality before OCR.
- Handling errors gracefully by flagging unclear inputs and guiding users to improve accuracy.

The result? A faster, more reliable attendance system that respects the tradition of roll calls but supercharges it with AI-powered automation.

---

## 💡 Features

1. **OCR Integration with EasyOCR**  
   Powerful digit extraction from varied handwriting styles, making roll number recognition precise. Supports multiple handwriting quirks—because no two pens write alike.

2. **User-Friendly Image Upload**  
   A clean, simple frontend lets users upload attendance sheet photos with zero hassle. Backend instantly processes images and returns detected roll numbers for attendance marking.

3. **Preprocessing Pipeline for Enhanced Accuracy**  
   - Converts images to grayscale for consistency.  
   - Applies noise reduction filters to clear up smudges and blurs.  
   - Uses thresholding techniques to highlight digits, boosting recognition success—even with faint or messy handwriting.

4. **Robust Error Handling**  
   Automatically flags unclear or ambiguous digits to prevent false attendance records. Provides user feedback on poor image quality or unreadable digits, encouraging re-uploads for clearer images and saving manual correction time.

---

## 🛠️ Tech Stack

- **Frontend:**  
  React.js with React Router DOM for multi-page navigation and modular UI experience.  
  (Includes Welcome, Help, Know More, Attendance Dashboard, Mark Attendance, Monthly Summarizer, AI Anomaly Detection, Developers pages)

- **Backend:**  
  Python Flask API handling file uploads, image preprocessing, OCR extraction, and attendance analysis.  
  Flask-CORS enables smooth cross-origin communication with the frontend.

- **OCR Engine:**  
  EasyOCR powered by PyTorch — robust handwritten digit recognition across diverse handwriting styles.

- **Image Processing:**  
  OpenCV for advanced image filtering (grayscale, Gaussian blur, adaptive thresholding) to prep images for OCR.  
  PIL (Python Imaging Library) optionally used in backend.

- **Data Handling & Communication:**  
  JSON API responses, enabling seamless frontend-backend data exchange for all core endpoints (`/upload`, `/monthly-summary`, `/ai-anomaly`).

---

## ⚙️ How It Works

1. **Upload Image:** User uploads a photo or scan of an attendance sheet.  
2. **Preprocess Image:** Backend runs filters to optimize image quality.  
3. **OCR Processing:** EasyOCR reads and extracts roll numbers.  
4. **Error Checking:** System verifies clarity; unclear digits get flagged.  
5. **Result Delivery:** Recognized roll numbers are sent back to frontend for display.  
6. **Attendance Marking:** User confirms or corrects results before final submission.

---

## 🎯 Usage

- Open the app in your browser.  
- Navigate to the attendance upload page.  
- Upload a clear photo of the attendance sheet.  
- Wait for the backend to process and display roll numbers.  
- Review detected digits; fix flagged errors if any.  
- Submit attendance digitally with confidence.

---

## 🧠 Why This Matters

Traditional attendance is slow, error-prone, and a drain on time. By marrying time-tested practices with AI-driven OCR, this project honors the past’s structure while embracing the future’s speed and accuracy. It’s about working smarter, not harder, without losing the essence of accountability.

---

Feel free to reach out for questions or contributions!

---
