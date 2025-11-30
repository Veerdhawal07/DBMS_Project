import requests
import json
import time

def test_registration_data():
    print("=== TESTING REGISTRATION DATA FLOW ===\n")
    
    # Generate unique emails using timestamp
    timestamp = int(time.time())
    
    # Test patient registration with full data
    print("1. Testing patient registration with full data...")
    patient_data = {
        "full_name": "Test Patient Complete",
        "email": f"patientcomplete{timestamp}@example.com",
        "password": "completepass123",
        "date_of_birth": "1990-01-01",
        "gender": "male",
        "address": "456 Complete Street, Test City",
        "phone": "9876543210"
    }
    
    try:
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
            print(f"   Patient Name: {patient_result['patient']['full_name']}")
            print(f"   Patient Email: {patient_result['patient']['email']}")
            print(f"   Patient DOB: {patient_result['patient'].get('date_of_birth', 'N/A')}")
            print(f"   Patient Gender: {patient_result['patient'].get('gender', 'N/A')}")
            print(f"   Patient Address: {patient_result['patient'].get('address', 'N/A')}")
            print(f"   Patient Phone: {patient_result['patient'].get('phone', 'N/A')}")
        else:
            print(f"❌ Patient registration failed: {reg_response.text}")
    except Exception as e:
        print(f"❌ Error during patient registration: {e}")
    
    # Test doctor registration with full data
    print("\n2. Testing doctor registration with full data...")
    doctor_data = {
        "full_name": "Dr. Complete Test",
        "email": f"doctorcomplete{timestamp}@example.com",
        "password": "completepass123",
        "specialization": "Complete Medicine",
        "medical_license_number": "ML987654",
        "hospital_name": "Complete Medical Center",
        "phone": "9876543210"
    }
    
    try:
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
            print(f"   Doctor Name: {doctor_result['doctor']['full_name']}")
            print(f"   Doctor Email: {doctor_result['doctor']['email']}")
            print(f"   Doctor Specialization: {doctor_result['doctor']['specialization']}")
            print(f"   Doctor Hospital: {doctor_result['doctor']['hospital_name']}")
            print(f"   Doctor Phone: {doctor_result['doctor']['phone']}")
        else:
            print(f"❌ Doctor registration failed: {reg_response.text}")
    except Exception as e:
        print(f"❌ Error during doctor registration: {e}")
    
    print("\n=== REGISTRATION DATA FLOW TESTS COMPLETED ===")

if __name__ == "__main__":
    test_registration_data()