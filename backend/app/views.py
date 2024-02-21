from flask import Blueprint, request, jsonify
from .process import process_csv
from flask_cors import cross_origin
bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    return "Welcome to DataLift!"

@bp.route('/process', methods=['POST'])
@cross_origin()
def process():
    uploaded_file = request.files['file']
    if uploaded_file and uploaded_file.filename.endswith('.csv'):
        # Save the file temporarily or process from memory
        temp_path = "./file.csv"
        uploaded_file.save(temp_path)
        
        # Process the CSV and get JSON output
        json_output = process_csv(temp_path)
        
        # Return the JSON response
        return jsonify(json_output)
    else:
        return jsonify({"error": "Invalid file format"}), 400
