from flask import Flask
from flask_cors import CORS
from .views import bp

def create_app():
    app = Flask(__name__)
    # Allow all origins for development
    CORS(app, supports_credentials=True)
    app.register_blueprint(bp)
    return app
