from flask import Blueprint, request, jsonify
import whois
import dns.resolver
import requests
from bs4 import BeautifulSoup
import os
import json

bp = Blueprint('domain', __name__, url_prefix='/api/domain')

@bp.route('/whois', methods=['POST'])
def domain_whois():
    """Get WHOIS information for a domain"""
    data = request.get_json()
    
    if not data or 'domain' not in data:
        return jsonify({"error": "Domain is required"}), 400
    
    domain = data['domain']
    
    try:
        # Get WHOIS information
        whois_info = whois.whois(domain)
        
        # Convert datetime objects to strings for JSON serialization
        serializable_whois = {}
        for key, value in whois_info.items():
            if isinstance(value, (list, tuple)):
                serializable_whois[key] = [str(item) if hasattr(item, 'strftime') else item for item in value]
            else:
                serializable_whois[key] = str(value) if hasattr(value, 'strftime') else value
        
        return jsonify({
            "domain": domain,
            "whois_data": serializable_whois
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/dns', methods=['POST'])
def domain_dns():
    """Get DNS records for a domain"""
    data = request.get_json()
    
    if not data or 'domain' not in data:
        return jsonify({"error": "Domain is required"}), 400
    
    domain = data['domain']
    record_types = data.get('record_types', ['A', 'AAAA', 'MX', 'NS', 'TXT', 'SOA', 'CNAME'])
    
    try:
        results = {}
        
        for record_type in record_types:
            try:
                answers = dns.resolver.resolve(domain, record_type)
                results[record_type] = [str(rdata) for rdata in answers]
            except dns.resolver.NoAnswer:
                results[record_type] = []
            except dns.resolver.NXDOMAIN:
                results[record_type] = ["Domain does not exist"]
            except Exception as e:
                results[record_type] = [f"Error: {str(e)}"]
        
        return jsonify({
            "domain": domain,
            "dns_records": results
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/headers', methods=['POST'])
def domain_headers():
    """Get HTTP headers for a domain"""
    data = request.get_json()
    
    if not data or 'domain' not in data:
        return jsonify({"error": "Domain is required"}), 400
    
    domain = data['domain']
    
    # Ensure domain has http/https prefix
    if not domain.startswith(('http://', 'https://')):
        domain = 'https://' + domain
    
    try:
        response = requests.head(domain, timeout=10)
        
        return jsonify({
            "domain": domain,
            "status_code": response.status_code,
            "headers": dict(response.headers)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500 