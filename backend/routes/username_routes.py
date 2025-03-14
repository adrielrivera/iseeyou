from flask import Blueprint, request, jsonify
import requests
import os
import json
import time

bp = Blueprint('username', __name__, url_prefix='/api/username')

# List of popular sites to check for usernames
# This is a small sample - a real implementation would have many more
SITES = [
    {"name": "GitHub", "url": "https://github.com/{username}", "error_type": "status_code"},
    {"name": "Twitter", "url": "https://twitter.com/{username}", "error_type": "status_code"},
    {"name": "Instagram", "url": "https://www.instagram.com/{username}", "error_type": "status_code"},
    {"name": "Reddit", "url": "https://www.reddit.com/user/{username}", "error_type": "status_code"},
    {"name": "Medium", "url": "https://medium.com/@{username}", "error_type": "status_code"},
    {"name": "Pinterest", "url": "https://www.pinterest.com/{username}", "error_type": "status_code"},
    {"name": "LinkedIn", "url": "https://www.linkedin.com/in/{username}", "error_type": "status_code"}
]

@bp.route('/search', methods=['POST'])
def search_username():
    """Search for a username across multiple platforms"""
    data = request.get_json()
    
    if not data or 'username' not in data:
        return jsonify({"error": "Username is required"}), 400
    
    username = data['username']
    
    # Optional parameter to limit number of sites to check
    limit = data.get('limit', len(SITES))
    sites_to_check = SITES[:limit]
    
    results = []
    
    for site in sites_to_check:
        try:
            url = site["url"].format(username=username)
            
            # Add a user agent to avoid some blocks
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
            
            response = requests.get(url, headers=headers, timeout=10)
            
            # Check if the profile exists based on status code
            # Note: This is a simple check and might not work for all sites
            # Some sites return 200 even if the profile doesn't exist
            exists = response.status_code == 200
            
            results.append({
                "site": site["name"],
                "url": url,
                "exists": exists,
                "status_code": response.status_code
            })
            
            # Add a small delay to avoid rate limiting
            time.sleep(0.5)
            
        except Exception as e:
            results.append({
                "site": site["name"],
                "url": url,
                "exists": False,
                "error": str(e)
            })
    
    return jsonify({
        "username": username,
        "results": results
    })

@bp.route('/sherlock', methods=['POST'])
def sherlock_search():
    """Placeholder for Sherlock integration"""
    data = request.get_json()
    
    if not data or 'username' not in data:
        return jsonify({"error": "Username is required"}), 400
    
    username = data['username']
    
    # Note: This is a placeholder. In a real implementation, you would integrate with Sherlock
    # Sherlock is a powerful tool for hunting down social media accounts by username
    # https://github.com/sherlock-project/sherlock
    
    return jsonify({
        "username": username,
        "message": "This endpoint is a placeholder for Sherlock integration. In a production environment, you would execute the Sherlock tool and parse its results.",
        "documentation": "https://github.com/sherlock-project/sherlock"
    }) 