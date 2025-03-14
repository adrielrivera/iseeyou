from flask import Blueprint, request, jsonify
import requests
import os
import json
from ipwhois import IPWhois
import socket
import re

bp = Blueprint('ip', __name__, url_prefix='/api/ip')

@bp.route('/geolocation', methods=['POST'])
def ip_geolocation():
    """Get geolocation information for an IP address"""
    data = request.get_json()
    
    if not data or 'ip' not in data:
        return jsonify({"error": "IP address is required"}), 400
    
    ip = data['ip']
    
    # Validate IP format
    ip_regex = r'^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$'
    if not re.match(ip_regex, ip):
        return jsonify({"error": "Invalid IP address format"}), 400
    
    try:
        # Using ip-api.com (free, no API key required)
        response = requests.get(f"http://ip-api.com/json/{ip}", timeout=10)
        geo_data = response.json()
        
        return jsonify({
            "ip": ip,
            "geolocation": geo_data
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/whois', methods=['POST'])
def ip_whois():
    """Get WHOIS information for an IP address"""
    data = request.get_json()
    
    if not data or 'ip' not in data:
        return jsonify({"error": "IP address is required"}), 400
    
    ip = data['ip']
    
    try:
        # Get WHOIS information
        obj = IPWhois(ip)
        whois_data = obj.lookup_rdap()
        
        return jsonify({
            "ip": ip,
            "whois_data": whois_data
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/reverse-dns', methods=['POST'])
def reverse_dns():
    """Get reverse DNS information for an IP address"""
    data = request.get_json()
    
    if not data or 'ip' not in data:
        return jsonify({"error": "IP address is required"}), 400
    
    ip = data['ip']
    
    try:
        # Get reverse DNS
        hostname = socket.gethostbyaddr(ip)[0]
        
        return jsonify({
            "ip": ip,
            "hostname": hostname
        })
    
    except socket.herror:
        return jsonify({
            "ip": ip,
            "hostname": None,
            "message": "No hostname found for this IP address"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/shodan', methods=['POST'])
def shodan_search():
    """Placeholder for Shodan integration"""
    data = request.get_json()
    
    if not data or 'ip' not in data:
        return jsonify({"error": "IP address is required"}), 400
    
    ip = data['ip']
    
    # Note: This is a placeholder. The actual Shodan API requires an API key
    # In a real implementation, you would use:
    # SHODAN_API_KEY = os.environ.get('SHODAN_API_KEY')
    
    return jsonify({
        "ip": ip,
        "message": "This endpoint requires a Shodan API key. Please add your API key to the .env file.",
        "documentation": "https://developer.shodan.io/api"
    }) 