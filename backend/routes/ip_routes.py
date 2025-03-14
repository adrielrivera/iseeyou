from flask import Blueprint, request, jsonify
import requests
import os
import json
from ipwhois import IPWhois
import socket
import re
import random

bp = Blueprint('ip', __name__, url_prefix='/api/ip')

# Common ports and services for mock data
COMMON_PORTS = {
    21: {"service": "FTP", "product": "vsftpd", "version": "3.0.3"},
    22: {"service": "SSH", "product": "OpenSSH", "version": "8.2p1"},
    25: {"service": "SMTP", "product": "Postfix", "version": "3.4.13"},
    53: {"service": "DNS", "product": "BIND", "version": "9.16.1"},
    80: {"service": "HTTP", "product": "Apache", "version": "2.4.41"},
    110: {"service": "POP3", "product": "Dovecot", "version": "2.3.7"},
    143: {"service": "IMAP", "product": "Dovecot", "version": "2.3.7"},
    443: {"service": "HTTPS", "product": "Apache", "version": "2.4.41"},
    465: {"service": "SMTPS", "product": "Postfix", "version": "3.4.13"},
    993: {"service": "IMAPS", "product": "Dovecot", "version": "2.3.7"},
    995: {"service": "POP3S", "product": "Dovecot", "version": "2.3.7"},
    3306: {"service": "MySQL", "product": "MySQL", "version": "8.0.28"},
    5432: {"service": "PostgreSQL", "product": "PostgreSQL", "version": "12.9"},
    8080: {"service": "HTTP-Proxy", "product": "nginx", "version": "1.18.0"},
    8443: {"service": "HTTPS-Alt", "product": "nginx", "version": "1.18.0"}
}

# Common operating systems for mock data
COMMON_OS = ["Ubuntu 20.04", "CentOS 8", "Debian 10", "Windows Server 2019", "FreeBSD 12.2"]

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
    """Generate realistic mock data for Shodan information"""
    data = request.get_json()
    
    if not data or 'ip' not in data:
        return jsonify({"error": "IP address is required"}), 400
    
    ip = data['ip']
    
    # Note: This is using mock data since the actual Shodan API requires an API key
    # In a real implementation, you would use:
    # SHODAN_API_KEY = os.environ.get('SHODAN_API_KEY')
    
    # Generate deterministic but seemingly random data based on the IP
    # This ensures consistent results for the same IP
    ip_seed = sum(int(octet) for octet in ip.split('.'))
    random.seed(ip_seed)
    
    # Select a random number of open ports
    num_ports = random.randint(2, 8)
    port_keys = list(COMMON_PORTS.keys())
    random.shuffle(port_keys)
    selected_ports = port_keys[:num_ports]
    
    # Generate mock port data
    ports_data = []
    for port in selected_ports:
        port_info = COMMON_PORTS[port].copy()
        # Add some randomness to versions
        if random.random() < 0.3:  # 30% chance of a different version
            version_parts = port_info["version"].split('.')
            if len(version_parts) > 2:
                version_parts[-1] = str(random.randint(0, 20))
                port_info["version"] = '.'.join(version_parts)
        
        ports_data.append({
            "port": port,
            "transport": "tcp",
            "service": port_info["service"],
            "product": port_info["product"],
            "version": port_info["version"]
        })
    
    # Select a random OS
    os = random.choice(COMMON_OS)
    
    # Generate mock Shodan data
    mock_shodan_data = {
        "ip": ip,
        "ports": [p["port"] for p in ports_data],
        "hostnames": [f"host-{ip.replace('.', '-')}.example.com"] if random.random() < 0.7 else [],
        "country": "United States",
        "city": "New York",
        "org": f"Example Organization {random.randint(1, 100)}",
        "isp": f"Example ISP {random.randint(1, 20)}",
        "os": os,
        "services": ports_data,
        "last_update": "2023-01-01T00:00:00.000Z",
        "vulns": []
    }
    
    # Add some vulnerabilities with 40% probability
    if random.random() < 0.4:
        num_vulns = random.randint(1, 3)
        cve_years = [2021, 2022, 2023]
        for _ in range(num_vulns):
            year = random.choice(cve_years)
            cve_id = f"CVE-{year}-{random.randint(1000, 9999)}"
            mock_shodan_data["vulns"].append({
                "id": cve_id,
                "severity": random.choice(["Low", "Medium", "High", "Critical"]),
                "summary": f"Example vulnerability affecting {random.choice([p['product'] for p in ports_data])}"
            })
    
    return jsonify({
        "ip": ip,
        "shodan_data": mock_shodan_data,
        "note": "Using mock data for demonstration purposes. For real data, configure a Shodan API key."
    }) 