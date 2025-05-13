from flask import Flask, request, jsonify
import easyocr
import os

# Initialize Flask app and EasyOCR reader
app = Flask(__name__)
reader = easyocr.Reader(['en'])

# Route to upload image and extract digits using EasyOCR
@app.route('/upload', methods=['POST'])
def upload_image():
    # Check if an image was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    # Check if the file has a name
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the file temporarily
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    # Use EasyOCR to read the text in the image (extract digits)
    result = reader.readtext(file_path, detail=0, paragraph=False)
    
    # Extract digits from the OCR result (only numeric values)
    extracted_digits = [item for item in result if item.isdigit()]

    # Clean up the file
    os.remove(file_path)

    # Return the extracted digits
    return jsonify({'extracted_digits': extracted_digits})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
