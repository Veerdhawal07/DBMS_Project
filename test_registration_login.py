import requests
import json
import time

def test_registration_login():
    print("=== TESTING REGISTRATION AND LOGIN FLOW ===\n")
    
    # Generate unique emails using timestamp
    timestamp = int(time.time())
    
    # Test patient registration and login
    print("1. Testing patient registration and login...")
    patient_data = {
        "full_name": "Test Patient Flow",
        "email": f"patientflow{timestamp}@example.com",
        "password": "flowpass123",
        "date_of_birth": "1990-01-01",
        "gender": "male",
        "address": "123 Flow Street",
        "phone": "1234567890"
    }
    
    try:
        # Register patient
        reg_response = requests.post(
            "http://localhost:8000/api/patients/signup",
            headers={"Content-Type": "application/json"},
            data=json.dumps(patient_data),
            timeout=10
        )
        
        print(f"   Registration Status Code: {reg_response.status_code}")
        if reg_response.status_code == 200:
            print("✅ Patient registration successful!")
            patient_result = reg_response.json()
            print(f"   Patient ID: {patient_result['patient']['id']}")
            
            # Login patient
            login_data = {
                "email": patient_data["email"],
                "password": patient_data["password"]
            }
            
            login_response = requests.post(
                "http://localhost:8000/api/patients/login",
                headers={"Content-Type": "application/json"},
                data=json.dumps(login_data),
                timeout=10
            )
            
            print(f"   Login Status Code: {login_response.status_code}")
            if login_response.status_code == 200:
                print("✅ Patient login successful!")
                login_result = login_response.json()
                print(f"   Patient ID: {login_result['patient']['id']}")
            else:
                print(f"❌ Patient login failed: {login_response.text}")
        else:
            print(f"❌ Patient registration failed: {reg_response.text}")
    except Exception as e:
        print(f"❌ Error during patient flow: {e}")
    
    # Test doctor registration and login
    print("\n2. Testing doctor registration and login...")
    doctor_data = {
        "full_name": "Dr. Test Flow Doctor",
        "email": f"doctorflow{timestamp}@example.com",
        "password": "flowpass123",
        "specialization": "Flow Medicine",
        "hospital_name": "Flow Hospital",
        "phone": "1234567890"
    }
    
    try:
        # Register doctor
        reg_response = requests.post(
            "http://localhost:8000/api/doctors/signup",
            headers={"Content-Type": "application/json"},
            data=json.dumps(doctor_data),
            timeout=10
        )
        
        print(f"   Registration Status Code: {reg_response.status_code}")
        if reg_response.status_code == 200:
            print("✅ Doctor registration successful!")
            doctor_result = reg_response.json()
            print(f"   Doctor ID: {doctor_result['doctor']['id']}")
            
            # Login doctor
            login_data = {
                "email": doctor_data["email"],
                "password": doctor_data["password"]
            }
            
            login_response = requests.post(
                "http://localhost:8000/api/doctors/login",
                headers={"Content-Type": "application/json"},
                data=json.dumps(login_data),
                timeout=10
            )
            
            print(f"   Login Status Code: {login_response.status_code}")
            if login_response.status_code == 200:
                print("✅ Doctor login successful!")
                login_result = login_response.json()
                print(f"   Doctor ID: {login_result['doctor']['id']}")
            else:
                print(f"❌ Doctor login failed: {login_response.text}")
        else:
            print(f"❌ Doctor registration failed: {reg_response.text}")
    except Exception as e:
        print(f"❌ Error during doctor flow: {e}")
    
    print("\n=== REGISTRATION AND LOGIN FLOW TESTS COMPLETED ===")

if __name__ == "__main__":
    test_registration_login()