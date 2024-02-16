# backend/app/views.py

from flask import Blueprint

bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    return "Welcome to DataLift!"

@bp.route('/about')
def about():
    return "About DataLift"
