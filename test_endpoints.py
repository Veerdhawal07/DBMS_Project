import requests
import json
import time

def test_endpoints():
    print("=== TESTING REGISTRATION AND LOGIN ENDPOINTS ===\n")
    
    # Test patient registration
    print("1. Testing patient registration...")
    patient_data = {
        "full_name": "Test Patient New",
        "email": f"testpatient{int(time.time())}@example.com",
        "password": "testpass123",
        "date_of_birth": "1990-01-01",
        "gender": "male",
        "address": "123 Test Street",
        "phone": "1234567890"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/api/patients/signup",
            headers={"Content-Type": "application/json"},
            data=json.dumps(patient_data),
            timeout=10
        )
        
        print(f"   Status Code: {response.status_code}")
        if response.status_code == 200:
            print("✅ Patient registration successful!")
            patient_result = response.json()
            print(f"   Patient ID: {patient_result['patient']['id']}")
        else:
            print(f"❌ Patient registration failed: {response.text}")
    except Exception as e:
        print(f"❌ Error during patient registration: {e}")
    
    # Test doctor registration
    print("\n2. Testing doctor registration...")
    doctor_data = {
        "full_name": "Dr. Test Doctor New",
        "email": f"testdoctor{int(time.time())}@example.com",
        "password": "testpass123",
        "specialization": "Test Medicine",
        "hospital_name": "Test Hospital",
        "phone": "1234567890"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/api/doctors/signup",
            headers={"Content-Type": "application/json"},
            data=json.dumps(doctor_data),
            timeout=10
        )
        
        print(f"   Status Code: {response.status_code}")
        if response.status_code == 200:
            print("✅ Doctor registration successful!")
            doctor_result = response.json()
            print(f"   Doctor ID: {doctor_result['doctor']['id']}")
        else:
            print(f"❌ Doctor registration failed: {response.text}")
    except Exception as e:
        print(f"❌ Error during doctor registration: {e}")
    
    print("\n=== ENDPOINT TESTS COMPLETED ===")

if __name__ == "__main__":
    test_endpoints()