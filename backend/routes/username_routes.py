from flask import Blueprint, request, jsonify
import requests
import os
import json
import time
import random

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

# Extended list of sites for Sherlock mock data
SHERLOCK_SITES = [
    {"name": "GitHub", "url": "https://github.com/{username}"},
    {"name": "Twitter", "url": "https://twitter.com/{username}"},
    {"name": "Instagram", "url": "https://www.instagram.com/{username}"},
    {"name": "Reddit", "url": "https://www.reddit.com/user/{username}"},
    {"name": "Medium", "url": "https://medium.com/@{username}"},
    {"name": "Pinterest", "url": "https://www.pinterest.com/{username}"},
    {"name": "LinkedIn", "url": "https://www.linkedin.com/in/{username}"},
    {"name": "Facebook", "url": "https://www.facebook.com/{username}"},
    {"name": "TikTok", "url": "https://www.tiktok.com/@{username}"},
    {"name": "YouTube", "url": "https://www.youtube.com/user/{username}"},
    {"name": "Twitch", "url": "https://www.twitch.tv/{username}"},
    {"name": "Snapchat", "url": "https://www.snapchat.com/add/{username}"},
    {"name": "Spotify", "url": "https://open.spotify.com/user/{username}"},
    {"name": "SoundCloud", "url": "https://soundcloud.com/{username}"},
    {"name": "Steam", "url": "https://steamcommunity.com/id/{username}"},
    {"name": "Patreon", "url": "https://www.patreon.com/{username}"},
    {"name": "Behance", "url": "https://www.behance.net/{username}"},
    {"name": "Flickr", "url": "https://www.flickr.com/people/{username}"},
    {"name": "Vimeo", "url": "https://vimeo.com/{username}"},
    {"name": "DeviantArt", "url": "https://{username}.deviantart.com"},
    {"name": "Quora", "url": "https://www.quora.com/profile/{username}"},
    {"name": "Tumblr", "url": "https://{username}.tumblr.com"},
    {"name": "Dribbble", "url": "https://dribbble.com/{username}"},
    {"name": "Gravatar", "url": "https://en.gravatar.com/{username}"},
    {"name": "GitLab", "url": "https://gitlab.com/{username}"},
    {"name": "Bitbucket", "url": "https://bitbucket.org/{username}"},
    {"name": "HackerNews", "url": "https://news.ycombinator.com/user?id={username}"},
    {"name": "ProductHunt", "url": "https://www.producthunt.com/@{username}"},
    {"name": "Keybase", "url": "https://keybase.io/{username}"},
    {"name": "SlideShare", "url": "https://www.slideshare.net/{username}"}
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
    """Generate realistic mock data for Sherlock username search"""
    data = request.get_json()
    
    if not data or 'username' not in data:
        return jsonify({"error": "Username is required"}), 400
    
    username = data['username']
    
    # Note: This is using mock data since the actual Sherlock tool would need to be executed
    # In a real implementation, you would integrate with the Sherlock tool
    # https://github.com/sherlock-project/sherlock
    
    # Generate deterministic but seemingly random results based on the username
    # This ensures consistent results for the same username
    username_seed = sum(ord(c) for c in username)
    random.seed(username_seed)
    
    # Determine how many sites the username exists on (between 20% and 60%)
    existence_probability = 0.2 + (username_seed % 100) / 250  # Between 0.2 and 0.6
    
    results = []
    for site in SHERLOCK_SITES:
        url = site["url"].format(username=username)
        
        # Deterministically decide if the username exists on this site
        site_hash = sum(ord(c) for c in site["name"])
        exists = random.random() < existence_probability
        
        # For some popular sites, make it more likely that common usernames exist
        if site["name"] in ["GitHub", "Twitter", "Instagram", "Reddit"] and len(username) >= 4 and len(username) <= 10:
            exists = exists or random.random() < 0.7
        
        results.append({
            "site": site["name"],
            "url": url,
            "exists": exists,
            "status_code": 200 if exists else 404,
            "response_time": round(random.uniform(0.1, 2.5), 2)
        })
    
    # Sort results by existence (found profiles first)
    results.sort(key=lambda x: (not x["exists"], x["site"]))
    
    return jsonify({
        "username": username,
        "found_on": sum(1 for r in results if r["exists"]),
        "total_sites": len(results),
        "results": results,
        "note": "Using mock data for demonstration purposes. In a production environment, you would execute the Sherlock tool and parse its results."
    }) 