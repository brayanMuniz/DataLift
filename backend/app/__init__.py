# backend/app/__init__.py

from flask import Flask
from .views import bp  # Import the Blueprint

def create_app():
    app = Flask(__name__)
    app.register_blueprint(bp)  # Register the Blueprint
    return app
