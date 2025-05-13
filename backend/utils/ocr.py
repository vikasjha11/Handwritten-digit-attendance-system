import easyocr
import tempfile

# Initialize reader
reader = easyocr.Reader(['en'])

def extract_roll_numbers(image_file):
    try:
        # Save image file to a temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as temp:
            image_file.save(temp.name)
            result = reader.readtext(temp.name)
        
        print("Extracted Text:", result)
        roll_numbers = [text[1] for text in result if text[1].isdigit()]
        return roll_numbers
    except Exception as e:
        print(f"Error in OCR: {e}")
        raise e
