# =================== IMPORTS & INITIALIZATION ===================
from flask import Flask, request, jsonify
from flask_cors import CORS
import easyocr
import os
import re
import cv2
import numpy as np

# =================== FLASK APP & OCR SETUP ===================
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
reader = easyocr.Reader(['en'])

# =================== IMAGE PREPROCESSING ===================
def preprocess_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    img = cv2.GaussianBlur(img, (3, 3), 0)
    img = cv2.adaptiveThreshold(
        img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 15
    )
    processed_path = image_path.replace(".jpg", "_processed.jpg").replace(".png", "_processed.png")
    cv2.imwrite(processed_path, img)
    return processed_path

# =================== UPLOAD ENDPOINT ===================
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    os.makedirs('uploads', exist_ok=True)
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)
    processed_path = preprocess_image(file_path)
    result = reader.readtext(processed_path, detail=0, paragraph=False)
    print("OCR Result (upload):", result)
    os.remove(file_path)
    os.remove(processed_path)
    return jsonify({'status': 'success', 'rollNumbers': result})

# =================== MONTHLY SUMMARY ENDPOINT ===================
@app.route('/monthly-summary', methods=['POST'])
def monthly_summary():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    debar_percent = float(request.form.get('debarPercent', 75))
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    os.makedirs('uploads', exist_ok=True)
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)
    processed_path = preprocess_image(file_path)
    ocr_result = reader.readtext(processed_path, detail=0, paragraph=False)
    print("OCR Result (monthly-summary):", ocr_result)
    students = []
    i = 0
    roll_pattern = re.compile(r"^\d+$")
    attendance_pattern = re.compile(r"(\d+)\s*[/|\-]\s*(\d+)")
    attendance_mark_pattern = re.compile(r"^[PAHBDF/|\s]+$", re.IGNORECASE)
    while i < len(ocr_result):
        roll_match = roll_pattern.match(ocr_result[i].strip().replace("|", "").replace(".", ""))
        if roll_match:
            roll = roll_match.group()
            name_parts = []
            percent = None
            status = "OK"
            j = i + 1
            while j < len(ocr_result):
                part = ocr_result[j].strip()
                if attendance_pattern.match(ocr_result[j]):
                    break
                if roll_pattern.match(ocr_result[j].strip().replace("|", "").replace(".", "")):
                    break
                if (
                    not attendance_mark_pattern.match(part)
                    and not "/" in part
                    and sum(c.isalpha() for c in part) >= max(2, len(part) // 2)
                ):
                    name_parts.append(part)
                j += 1
            name = " ".join(name_parts).strip()
            if j < len(ocr_result) and attendance_pattern.match(ocr_result[j]):
                try:
                    attended, total = map(int, attendance_pattern.match(ocr_result[j]).groups())
                    percent = round((attended / total) * 100, 2) if total > 0 else 0
                    status = "Debarred" if percent < debar_percent else "OK"
                except Exception:
                    percent = None
            if name and percent is not None:
                students.append({
                    "roll": roll,
                    "name": name,
                    "percent": percent,
                    "status": status
                })
            i = j + 1
        else:
            i += 1
    os.remove(file_path)
    os.remove(processed_path)
    if not students:
        return jsonify({'status': 'fail', 'error': 'Failed to extract from register. Please check image quality and format.'})
    return jsonify({'status': 'success', 'results': students})

# =================== AI ANOMALY ENDPOINT ===================
@app.route('/ai-anomaly', methods=['POST'])
def ai_anomaly():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    os.makedirs('uploads', exist_ok=True)
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)
    processed_path = preprocess_image(file_path)
    ocr_result = reader.readtext(processed_path, detail=0, paragraph=False)
    os.remove(file_path)
    os.remove(processed_path)
    students = []
    roll_pattern = re.compile(r"^\d+$")
    attendance_pattern = re.compile(r"(\d+)\s*[/|\-]\s*(\d+)")
    attendance_mark_pattern = re.compile(r"^[PAHBDFMEC/|\s]+$", re.IGNORECASE)
    i = 0
    while i < len(ocr_result):
        roll_match = roll_pattern.match(ocr_result[i].strip().replace("|", "").replace(".", ""))
        if roll_match:
            roll = roll_match.group()
            name_parts = []
            marks_list = []
            percent = None
            anomaly = None
            reason = ""
            j = i + 1
            # --- Extract name and attendance marks ---
            while j < len(ocr_result):
                part = ocr_result[j].strip()
                if attendance_pattern.match(part):
                    break
                if roll_pattern.match(part.replace("|", "").replace(".", "")):
                    break
                if attendance_mark_pattern.match(part):
                    marks_list.extend([x.strip().upper() for x in re.split(r'[|/,\s]+', part) if x.strip()])
                elif (
                    not "/" in part
                    and sum(c.isalpha() for c in part) >= max(2, len(part) // 2)
                ):
                    name_parts.append(part)
                j += 1
            name = " ".join(name_parts).strip()
            if j < len(ocr_result) and attendance_pattern.match(ocr_result[j]):
                try:
                    attended, total = map(int, attendance_pattern.match(ocr_result[j]).groups())
                    percent = round((attended / total) * 100, 2) if total > 0 else 0
                except Exception:
                    percent = None
            # --- AI Anomaly Detection Logic ---
            if percent is not None:
                if percent <= 60:
                    if any("M" in m for m in marks_list):
                        anomaly = "Medical Case"
                        reason = "Frequent medical leaves detected."
                    else:
                        anomaly = "Medical Case"
                        reason = "Low attendance, possibly due to medical reasons."
                elif 60 < percent < 70:
                    if any("E" in m or "PART" in m for m in marks_list):
                        anomaly = "Participation Case"
                        reason = "Participation in events detected."
                    else:
                        anomaly = "Participation Case"
                        reason = "Low attendance, possibly due to participation in events."
                elif 70 <= percent < 75:
                    anomaly = "Low Attendance"
                    reason = "Consistently low attendance, no special reason detected."
                elif percent >= 75:
                    anomaly = "Normal"
                    reason = "Attendance is regular."
            if name and percent is not None:
                students.append({
                    "roll": roll,
                    "name": name,
                    "percent": percent,
                    "anomaly": anomaly if anomaly else "Normal",
                    "reason": reason
                })
            i = j + 1
        else:
            i += 1
    analysis_text = (
        "AI Analysis Summary:\n"
        f"Total students: {len(students)}\n"
        f"Medical cases (<60%): {sum(1 for s in students if s['anomaly'] == 'Medical Case')}\n"
        f"Participation cases (61-69%): {sum(1 for s in students if s['anomaly'] == 'Participation Case')}\n"
        f"Low attendance (70-74.99%): {sum(1 for s in students if s['anomaly'] == 'Low Attendance')}\n"
        f"Regular students (>=75%): {sum(1 for s in students if s['anomaly'] == 'Normal')}\n"
    )
    return jsonify({'status': 'success', 'students': students, 'analysis': analysis_text})

# =================== MAIN ===================
if __name__ == '__main__':
    app.run(debug=True)
