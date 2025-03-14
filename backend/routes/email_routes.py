from flask import Blueprint, request, jsonify
import dns.resolver
import re
import os
import requests

bp = Blueprint('email', __name__, url_prefix='/api/email')

@bp.route('/validate', methods=['POST'])
def validate_email():
    """Validate an email address format and check MX records"""
    data = request.get_json()
    
    if not data or 'email' not in data:
        return jsonify({"error": "Email is required"}), 400
    
    email = data['email']
    
    # Basic format validation
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    format_valid = bool(re.match(email_regex, email))
    
    # Extract domain for MX record check
    if format_valid:
        domain = email.split('@')[1]
        mx_records = []
        
        try:
            # Check MX records
            mx_records_result = dns.resolver.resolve(domain, 'MX')
            mx_records = [str(mx.exchange) for mx in mx_records_result]
        except Exception:
            # If MX lookup fails, domain might not accept emails
            mx_records = []
    
    return jsonify({
        "email": email,
        "format_valid": format_valid,
        "domain": domain if format_valid else None,
        "has_mx_records": len(mx_records) > 0 if format_valid else False,
        "mx_records": mx_records if format_valid else []
    })

@bp.route('/haveibeenpwned', methods=['POST'])
def check_haveibeenpwned():
    """Check if email has been in data breaches (requires API key)"""
    data = request.get_json()
    
    if not data or 'email' not in data:
        return jsonify({"error": "Email is required"}), 400
    
    email = data['email']
    
    # Note: This is a placeholder. The actual HaveIBeenPwned API requires a paid API key
    # In a real implementation, you would use:
    # HIBP_API_KEY = os.environ.get('HIBP_API_KEY')
    
    return jsonify({
        "email": email,
        "message": "This endpoint requires a HaveIBeenPwned API key. Please add your API key to the .env file.",
        "documentation": "https://haveibeenpwned.com/API/v3"
    })

@bp.route('/domain-emails', methods=['POST'])
def find_domain_emails():
    """Find email addresses associated with a domain (placeholder)"""
    data = request.get_json()
    
    if not data or 'domain' not in data:
        return jsonify({"error": "Domain is required"}), 400
    
    domain = data['domain']
    
    # Note: This is a placeholder. In a real implementation, you would use tools like:
    # - TheHarvester
    # - Hunter.io API (requires API key)
    # - Email permutation techniques
    
    return jsonify({
        "domain": domain,
        "message": "This endpoint is a placeholder. In a production environment, you would integrate with services like TheHarvester or Hunter.io",
        "documentation": {
            "theharvester": "https://github.com/laramies/theHarvester",
            "hunter.io": "https://hunter.io/api"
        }
    }) 