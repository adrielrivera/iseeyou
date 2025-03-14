# I See You - OSINT Web Application

"I See You" is an Open Source Intelligence (OSINT) web application designed to gather intelligence on domains, email addresses, usernames, and IP addresses. It provides a user-friendly interface for cybersecurity professionals, researchers, and enthusiasts to collect and analyze publicly available information.

## Project Structure

The project consists of two main components:

1. **Backend (Flask)**: Provides API endpoints for various OSINT operations
2. **Frontend (React)**: User interface for interacting with the backend services

## Features

- **Domain Intelligence**: WHOIS lookups, DNS records, HTTP headers
- **Email Intelligence**: Email validation, breach checking, domain email discovery
- **Username Intelligence**: Social media profile discovery across multiple platforms
- **IP Intelligence**: Geolocation, WHOIS information, reverse DNS, port scanning

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file based on the `.env.example` file:
   ```bash
   cp .env.example .env
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the Backend

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python app.py
```

The API will be available at `http://localhost:5000`.

### Start the Frontend

```bash
cd frontend
npm start
```

The web application will be available at `http://localhost:3000`.

## API Keys and Placeholder Data

This project uses several third-party APIs for OSINT data gathering. For demonstration and portfolio purposes, the application is designed to work with placeholder/demo API keys.

### Current Implementation

The application uses the following strategies when API keys are not provided:

1. **WHOIS Information**: 
   - Tries the Python WHOIS library first
   - Falls back to system WHOIS command
   - Uses the WhoAPI demo service as a last resort
   - Provides realistic mock data for common domains

2. **Have I Been Pwned**: 
   - Uses mock data that simulates breach information
   - Provides consistent results for the same email address

3. **Shodan**:
   - Generates realistic mock data for port scanning and service detection
   - Creates deterministic results based on the IP address

4. **Username Search (Sherlock)**:
   - Simulates results from the Sherlock tool
   - Provides consistent profile detection across 30+ platforms

### Using Your Own API Keys

For full functionality in a production environment, you would need to obtain your own API keys from:

1. [WhoAPI](https://whoapi.com/) - For enhanced WHOIS information
2. [Have I Been Pwned](https://haveibeenpwned.com/API/Key) - For data breach information
3. [Shodan](https://account.shodan.io/) - For IP intelligence

To use your own API keys:

1. Register for the APIs mentioned above
2. Edit the `.env` file in the backend directory
3. Add your API keys in the following format:
   ```
   WHOAPI_KEY=your_key_here
   HIBP_KEY=your_key_here
   SHODAN_KEY=your_key_here
   ```

## Security and Legal Considerations

This tool is intended for educational and legitimate security research purposes only. Always ensure you have proper authorization before conducting OSINT activities on any target.

## License

MIT 