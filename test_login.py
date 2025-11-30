import requests
import json
import time

def test_login():
    print("=== TESTING LOGIN ENDPOINTS ===\n")
    
    # Test patient login
    print("1. Testing patient login...")
    patient_login_data = {
        "email": "testpatient@example.com",
        "password": "testpass123"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/api/patients/login",
            headers={"Content-Type": "application/json"},
            data=json.dumps(patient_login_data),
            timeout=10
        )
        
        print(f"   Status Code: {response.status_code}")
        if response.status_code == 200:
            print("✅ Patient login successful!")
            patient_result = response.json()
            print(f"   Patient ID: {patient_result['patient']['id']}")
        else:
            print(f"❌ Patient login failed: {response.text}")
    except Exception as e:
        print(f"❌ Error during patient login: {e}")
    
    # Test doctor login
    print("\n2. Testing doctor login...")
    doctor_login_data = {
        "email": "testdoctor@example.com",
        "password": "testpass123"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/api/doctors/login",
            headers={"Content-Type": "application/json"},
            data=json.dumps(doctor_login_data),
            timeout=10
        )
        
        print(f"   Status Code: {response.status_code}")
        if response.status_code == 200:
            print("✅ Doctor login successful!")
            doctor_result = response.json()
            print(f"   Doctor ID: {doctor_result['doctor']['id']}")
        else:
            print(f"❌ Doctor login failed: {response.text}")
    except Exception as e:
        print(f"❌ Error during doctor login: {e}")
    
    print("\n=== LOGIN TESTS COMPLETED ===")

if __name__ == "__main__":
    test_login()