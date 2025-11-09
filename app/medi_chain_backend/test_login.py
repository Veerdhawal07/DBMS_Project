import requests
import json

# Test patient login
login_data = {
    "email": "test@example.com",
    "password": "password123"
}

print("Testing patient login...")
try:
    response = requests.post(
        "http://localhost:8000/api/patients/login",
        headers={"Content-Type": "application/json"},
        data=json.dumps(login_data)
    )
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Login successful!")
        result = response.json()
        print(f"Patient ID: {result['patient']['id']}")
        print(f"Access Token: {result['access_token'][:50]}...")
    else:
        print(f"Login failed: {response.text}")
except Exception as e:
    print(f"Error: {e}")