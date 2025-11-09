import requests
import json

# Test doctor registration
doctor_data = {
    "full_name": "Dr. Smith",
    "email": "drsmith@example.com",
    "password": "doctorpass123",
    "specialization": "Cardiology",
    "hospital_name": "City Hospital",
    "phone": "9876543210"
}

print("Testing doctor registration...")
try:
    response = requests.post(
        "http://localhost:8000/api/doctors/signup",
        headers={"Content-Type": "application/json"},
        data=json.dumps(doctor_data)
    )
    print(f"Registration Status Code: {response.status_code}")
    
    if response.status_code == 200:
        print("Doctor registration successful!")
        result = response.json()
        doctor_id = result['doctor']['id']
        print(f"Doctor ID: {doctor_id}")
        
        # Now test login with the same credentials
        login_data = {
            "email": "drsmith@example.com",
            "password": "doctorpass123"
        }
        
        print("\nTesting login with registered credentials...")
        login_response = requests.post(
            "http://localhost:8000/api/doctors/login",
            headers={"Content-Type": "application/json"},
            data=json.dumps(login_data)
        )
        print(f"Login Status Code: {login_response.status_code}")
        
        if login_response.status_code == 200:
            print("Doctor login successful!")
            login_result = login_response.json()
            print(f"Logged in doctor ID: {login_result['doctor']['id']}")
        else:
            print("Doctor login failed!")
            print(f"Login response: {login_response.text}")
    else:
        print("Doctor registration failed!")
        print(f"Registration response: {response.text}")
        
except Exception as e:
    print(f"Error: {e}")