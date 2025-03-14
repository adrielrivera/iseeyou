from flask import Blueprint, request, jsonify
import dns.resolver
import re
import os
import requests
import random
from datetime import datetime, timedelta

bp = Blueprint('email', __name__, url_prefix='/api/email')

# Mock data for HaveIBeenPwned API
MOCK_BREACH_DATA = [
    {
        "Name": "Adobe",
        "Title": "Adobe",
        "Domain": "adobe.com",
        "BreachDate": "2013-10-04",
        "AddedDate": "2013-12-04",
        "ModifiedDate": "2022-05-15",
        "PwnCount": 152445165,
        "Description": "In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text.",
        "DataClasses": ["Email addresses", "Password hints", "Passwords", "Usernames"]
    },
    {
        "Name": "LinkedIn",
        "Title": "LinkedIn",
        "Domain": "linkedin.com",
        "BreachDate": "2012-05-05",
        "AddedDate": "2016-05-22",
        "ModifiedDate": "2022-11-02",
        "PwnCount": 164611595,
        "Description": "In May 2016, LinkedIn had 164 million email addresses and passwords exposed. Originally hacked in 2012, the data remained out of sight until being offered for sale on a dark market site 4 years later.",
        "DataClasses": ["Email addresses", "Passwords"]
    },
    {
        "Name": "Dropbox",
        "Title": "Dropbox",
        "Domain": "dropbox.com",
        "BreachDate": "2012-07-01",
        "AddedDate": "2016-08-31",
        "ModifiedDate": "2022-11-02",
        "PwnCount": 68648009,
        "Description": "In mid-2012, Dropbox suffered a data breach which exposed the stored credentials of tens of millions of their customers. In August 2016, they forced password resets for customers they believed may be at risk.",
        "DataClasses": ["Email addresses", "Passwords"]
    }
]

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
    """Check if email has been in data breaches (uses mock data with placeholder API key)"""
    data = request.get_json()
    
    if not data or 'email' not in data:
        return jsonify({"error": "Email is required"}), 400
    
    email = data['email']
    
    # Note: This is using mock data since the actual HaveIBeenPwned API requires a paid API key
    # In a real implementation, you would use:
    # HIBP_API_KEY = os.environ.get('HIBP_API_KEY')
    
    # Deterministically decide if this email has been breached based on its characters
    # This makes the mock data consistent for the same email
    email_sum = sum(ord(c) for c in email)
    has_been_pwned = email_sum % 3 != 0  # 2/3 chance of being pwned
    
    if not has_been_pwned:
        return jsonify({
            "email": email,
            "breached": False,
            "breaches": [],
            "note": "Using mock data for demonstration purposes. For real data, configure a HaveIBeenPwned API key."
        })
    
    # Select a random number of breaches for this email
    num_breaches = min(len(MOCK_BREACH_DATA), 1 + (email_sum % 3))
    selected_breaches = random.sample(MOCK_BREACH_DATA, num_breaches)
    
    return jsonify({
        "email": email,
        "breached": True,
        "breaches": selected_breaches,
        "note": "Using mock data for demonstration purposes. For real data, configure a HaveIBeenPwned API key."
    })

@bp.route('/domain-emails', methods=['POST'])
def find_domain_emails():
    """Find email addresses associated with a domain (uses mock data)"""
    data = request.get_json()
    
    if not data or 'domain' not in data:
        return jsonify({"error": "Domain is required"}), 400
    
    domain = data['domain']
    
    # Generate realistic mock data for demonstration purposes
    common_names = ["john", "jane", "david", "sarah", "michael", "emma", "robert", "olivia", "william", "sophia"]
    common_positions = ["info", "contact", "support", "sales", "admin", "help", "marketing", "hr", "careers", "press"]
    
    # Generate a deterministic but seemingly random set of emails for this domain
    domain_hash = sum(ord(c) for c in domain)
    random.seed(domain_hash)  # Make results consistent for the same domain
    
    num_emails = 5 + (domain_hash % 10)  # Between 5-14 emails
    mock_emails = []
    
    # Add position-based emails
    num_positions = min(num_emails // 2, len(common_positions))
    for i in range(num_positions):
        position = common_positions[i]
        mock_emails.append({
            "email": f"{position}@{domain}",
            "source": "Common department email pattern",
            "confidence": "High"
        })
    
    # Add name-based emails
    remaining = num_emails - num_positions
    names_sample = random.sample(common_names, remaining)
    
    for name in names_sample:
        # Mix up email formats
        format_type = random.randint(0, 3)
        if format_type == 0:
            email = f"{name}@{domain}"
        elif format_type == 1:
            email = f"{name[0]}@{domain}"
        elif format_type == 2:
            email = f"{name}.{random.choice(common_names)}@{domain}"
        else:
            email = f"{name}_{random.randint(1, 99)}@{domain}"
            
        mock_emails.append({
            "email": email,
            "source": "Name pattern analysis",
            "confidence": ["Low", "Medium", "High"][random.randint(0, 2)]
        })
    
    return jsonify({
        "domain": domain,
        "emails": mock_emails,
        "note": "Using mock data for demonstration purposes. In a production environment, you would integrate with services like TheHarvester or Hunter.io"
    }) 