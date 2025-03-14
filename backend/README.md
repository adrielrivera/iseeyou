# I See You - OSINT Backend

This is the backend for the "I See You" OSINT (Open Source Intelligence) web application. It provides various API endpoints for gathering intelligence on domains, email addresses, usernames, and IP addresses.

## Setup

1. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file based on the `.env.example` file:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file and add your API keys for various services.

## Running the Backend

```bash
python app.py
```

The API will be available at `http://localhost:5000`.

## API Endpoints

### Health Check
- `GET /api/health` - Check if the API is running

### Domain Intelligence
- `POST /api/domain/whois` - Get WHOIS information for a domain
- `POST /api/domain/dns` - Get DNS records for a domain
- `POST /api/domain/headers` - Get HTTP headers for a domain

### Email Intelligence
- `POST /api/email/validate` - Validate an email address format and check MX records
- `POST /api/email/haveibeenpwned` - Check if email has been in data breaches (requires API key)
- `POST /api/email/domain-emails` - Find email addresses associated with a domain

### Username Intelligence
- `POST /api/username/search` - Search for a username across multiple platforms
- `POST /api/username/sherlock` - Search for a username using Sherlock (placeholder)

### IP Intelligence
- `POST /api/ip/geolocation` - Get geolocation information for an IP address
- `POST /api/ip/whois` - Get WHOIS information for an IP address
- `POST /api/ip/reverse-dns` - Get reverse DNS information for an IP address
- `POST /api/ip/shodan` - Get Shodan information for an IP address (requires API key)

## Security Considerations

This tool is intended for educational and legitimate security research purposes only. Always ensure you have proper authorization before conducting OSINT activities on any target.

## License

MIT 