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
        
        # Process the CSV and get the data as a Python dictionary
        data = process_csv(temp_path)
        # Use jsonify to return the data as a JSON response
        return jsonify(data)
    else:
        return jsonify({"error": "Invalid file format"}), 400