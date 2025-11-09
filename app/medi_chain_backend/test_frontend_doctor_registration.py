import requests
import json

# Test doctor registration through the frontend API format
doctor_data = {
    "full_name": "Dr. Johnson",
    "email": "drjohnson@example.com",
    "phone": "1112223333",
    "specialization": "Neurology",
    "medical_license_number": "NL987654",
    "hospital_name": "Neuro Clinic",
    "password": "neuropass123"
}

print("Testing frontend-style doctor registration...")
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
        print(f"Doctor Name: {result['doctor']['full_name']}")
        print(f"Doctor Email: {result['doctor']['email']}")
        print(f"Doctor Specialization: {result['doctor']['specialization']}")
        
        # Test login with the new doctor
        login_data = {
            "email": "drjohnson@example.com",
            "password": "neuropass123"
        }
        
        print("\nTesting login with new doctor credentials...")
        login_response = requests.post(
            "http://localhost:8000/api/doctors/login",
            headers={"Content-Type": "application/json"},
            data=json.dumps(login_data)
        )
        print(f"Login Status Code: {login_response.status_code}")
        
        if login_response.status_code == 200:
            print("New doctor login successful!")
            login_result = login_response.json()
            print(f"Logged in doctor ID: {login_result['doctor']['id']}")
        else:
            print("New doctor login failed!")
            print(f"Login response: {login_response.text}")
    else:
        print("Doctor registration failed!")
        print(f"Registration response: {response.text}")
        
except Exception as e:
    print(f"Error: {e}")