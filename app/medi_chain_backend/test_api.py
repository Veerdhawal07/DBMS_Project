import requests
import json
from datetime import datetime

# Test patient signup
signup_data = {
    "full_name": "Test Patient",
    "email": "test@example.com",
    "password": "password123",
    "date_of_birth": "1990-01-01T00:00:00",  # ISO format datetime string
    "gender": "male",
    "address": "123 Test St",
    "phone": "1234567890"
}

print("Testing patient signup...")
try:
    response = requests.post(
        "http://localhost:8000/api/patients/signup",
        headers={"Content-Type": "application/json"},
        data=json.dumps(signup_data)
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")