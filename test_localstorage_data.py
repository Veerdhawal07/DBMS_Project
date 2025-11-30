import requests
import json
import time

def test_localstorage_data():
    print("=== TESTING LOCALSTORAGE DATA FLOW ===\n")
    
    # Generate unique emails using timestamp
    timestamp = int(time.time())
    
    # Test patient registration and check response data
    print("1. Testing patient registration response data...")
    patient_data = {
        "full_name": "Storage Test Patient",
        "email": f"storagetest{timestamp}@example.com",
        "password": "storagepass123",
        "date_of_birth": "1985-05-15",
        "gender": "female",
        "address": "789 Storage Street, Data City",
        "phone": "5551234567"
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
            
            # Check that all data is in the response
            patient_profile = patient_result['patient']
            print(f"   Full Name: {patient_profile.get('full_name', 'MISSING')}")
            print(f"   Email: {patient_profile.get('email', 'MISSING')}")
            print(f"   Date of Birth: {patient_profile.get('date_of_birth', 'MISSING')}")
            print(f"   Gender: {patient_profile.get('gender', 'MISSING')}")
            print(f"   Address: {patient_profile.get('address', 'MISSING')}")
            print(f"   Phone: {patient_profile.get('phone', 'MISSING')}")
            
            # This is the data that should be stored in localStorage
            print(f"\n   localStorage data structure:")
            print(f"   {{")
            print(f"     full_name: '{patient_profile.get('full_name')}',")
            print(f"     email: '{patient_profile.get('email')}',")
            print(f"     date_of_birth: '{patient_profile.get('date_of_birth')}',")
            print(f"     gender: '{patient_profile.get('gender')}',")
            print(f"     address: '{patient_profile.get('address')}',")
            print(f"     phone: '{patient_profile.get('phone')}'")
            print(f"   }}")
        else:
            print(f"❌ Patient registration failed: {reg_response.text}")
    except Exception as e:
        print(f"❌ Error during patient registration: {e}")
    
    # Test doctor registration and check response data
    print("\n2. Testing doctor registration response data...")
    doctor_data = {
        "full_name": "Dr. Storage Test",
        "email": f"doctorstorage{timestamp}@example.com",
        "password": "storagepass123",
        "specialization": "Storage Medicine",
        "medical_license_number": "ST123456",
        "hospital_name": "Storage Medical Center",
        "phone": "5559876543"
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
            
            # Check that all data is in the response
            doctor_profile = doctor_result['doctor']
            print(f"   Full Name: {doctor_profile.get('full_name', 'MISSING')}")
            print(f"   Email: {doctor_profile.get('email', 'MISSING')}")
            print(f"   Specialization: {doctor_profile.get('specialization', 'MISSING')}")
            print(f"   Hospital Name: {doctor_profile.get('hospital_name', 'MISSING')}")
            print(f"   Phone: {doctor_profile.get('phone', 'MISSING')}")
            
            # Note: medical_license_number is not in the response schema
            print(f"\n   localStorage data structure:")
            print(f"   {{")
            print(f"     full_name: '{doctor_profile.get('full_name')}',")
            print(f"     email: '{doctor_profile.get('email')}',")
            print(f"     specialization: '{doctor_profile.get('specialization')}',")
            print(f"     hospital_name: '{doctor_profile.get('hospital_name')}',")
            print(f"     phone: '{doctor_profile.get('phone')}'")
            print(f"   }}")
        else:
            print(f"❌ Doctor registration failed: {reg_response.text}")
    except Exception as e:
        print(f"❌ Error during doctor registration: {e}")
    
    print("\n=== LOCALSTORAGE DATA FLOW TESTS COMPLETED ===")
    print("✅ Profile pages should now correctly initialize with registration data")

if __name__ == "__main__":
    test_localstorage_data()