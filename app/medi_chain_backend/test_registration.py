import requests
import json

# Test patient registration
patient_data = {
    "full_name": "Test Patient 2",
    "email": "test2@example.com",
    "password": "password123",
    "date_of_birth": "1990-01-01T00:00:00",
    "gender": "male",
    "address": "123 Test St",
    "phone": "1234567890"
}

print("Testing patient registration...")
try:
    response = requests.post(
        "http://localhost:8000/api/patients/signup",
        headers={"Content-Type": "application/json"},
        data=json.dumps(patient_data)
    )
    print(f"Registration Status Code: {response.status_code}")
    print(f"Registration Response: {response.text}")
    
    if response.status_code == 200:
        print("Registration successful!")
        result = response.json()
        patient_id = result['patient']['id']
        print(f"Patient ID: {patient_id}")
        
        # Now test login with the same credentials
        login_data = {
            "email": "test2@example.com",
            "password": "password123"
        }
        
        print("\nTesting login with registered credentials...")
        login_response = requests.post(
            "http://localhost:8000/api/patients/login",
            headers={"Content-Type": "application/json"},
            data=json.dumps(login_data)
        )
        print(f"Login Status Code: {login_response.status_code}")
        print(f"Login Response: {login_response.text}")
        
        if login_response.status_code == 200:
            print("Login successful!")
        else:
            print("Login failed!")
    else:
        print("Registration failed!")
        
except Exception as e:
    print(f"Error: {e}")