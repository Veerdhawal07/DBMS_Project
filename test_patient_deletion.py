import requests
import json

def test_patient_deletion():
    print("=== TESTING PATIENT ACCOUNT DELETION ===\n")
    
    # Test 1: Register a new patient
    print("1. Registering new patient...")
    patient_data = {
        "full_name": "Test Patient",
        "email": "testpatient@example.com",
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
            data=json.dumps(patient_data)
        )
        
        if response.status_code == 200:
            print("✅ Patient registration successful!")
            patient_result = response.json()
            print(f"   Patient name in response: {patient_result['patient']['full_name']}")
        else:
            print(f"❌ Patient registration failed: {response.text}")
            return
    except Exception as e:
        print(f"❌ Error during patient registration: {e}")
        return
    
    # Test 2: Login as patient
    print("\n2. Logging in as patient...")
    login_data = {
        "email": "testpatient@example.com",
        "password": "testpass123"
    }
    
    try:
        login_response = requests.post(
            "http://localhost:8000/api/patients/login",
            headers={"Content-Type": "application/json"},
            data=json.dumps(login_data)
        )
        
        if login_response.status_code == 200:
            print("✅ Patient login successful!")
            login_result = login_response.json()
            patient_id = login_result['patient']['id']
            patient_token = login_result['access_token']
            print(f"   Patient ID: {patient_id}")
            print(f"   Patient name in response: {login_result['patient']['full_name']}")
        else:
            print(f"❌ Patient login failed: {login_response.text}")
            return
    except Exception as e:
        print(f"❌ Error during patient login: {e}")
        return
    
    # Test 3: Test delete account endpoint
    print("\n3. Testing delete account endpoint...")
    try:
        delete_response = requests.delete(
            "http://localhost:8000/api/patients/delete-account",
            headers={
                "Authorization": f"Bearer {patient_token}"
            }
        )
        
        if delete_response.status_code == 200:
            print("✅ Patient account deletion successful!")
            delete_result = delete_response.json()
            print(f"   Response: {delete_result['message']}")
        else:
            print(f"❌ Patient account deletion failed: {delete_response.text}")
            return
    except Exception as e:
        print(f"❌ Error during patient account deletion: {e}")
        return
    
    print("\n=== PATIENT TEST COMPLETED ===")
    print("✅ Patient account deletion functionality implemented")

if __name__ == "__main__":
    test_patient_deletion()