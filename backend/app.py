from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Import routes after app initialization to avoid circular imports
from routes import domain_routes, email_routes, username_routes, ip_routes

# Register blueprints
app.register_blueprint(domain_routes.bp)
app.register_blueprint(email_routes.bp)
app.register_blueprint(username_routes.bp)
app.register_blueprint(ip_routes.bp)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "I See You OSINT API is running"}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 