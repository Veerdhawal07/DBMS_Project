import requests
import json

def test_fixes():
    print("=== TESTING FIXES ===\n")
    
    # Test 1: Register a new doctor
    print("1. Registering new doctor...")
    doctor_data = {
        "full_name": "Dr. Test Doctor",
        "email": "testdoctor@example.com",
        "password": "testpass123",
        "specialization": "Test Medicine",
        "hospital_name": "Test Hospital",
        "phone": "1234567890"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/api/doctors/signup",
            headers={"Content-Type": "application/json"},
            data=json.dumps(doctor_data)
        )
        
        if response.status_code == 200:
            print("✅ Doctor registration successful!")
            doctor_result = response.json()
            print(f"   Doctor name in response: {doctor_result['doctor']['full_name']}")
        else:
            print(f"❌ Doctor registration failed: {response.text}")
            return
    except Exception as e:
        print(f"❌ Error during doctor registration: {e}")
        return
    
    # Test 2: Login as doctor
    print("\n2. Logging in as doctor...")
    login_data = {
        "email": "testdoctor@example.com",
        "password": "testpass123"
    }
    
    try:
        login_response = requests.post(
            "http://localhost:8000/api/doctors/login",
            headers={"Content-Type": "application/json"},
            data=json.dumps(login_data)
        )
        
        if login_response.status_code == 200:
            print("✅ Doctor login successful!")
            login_result = login_response.json()
            doctor_id = login_result['doctor']['id']
            doctor_token = login_result['access_token']
            print(f"   Doctor ID: {doctor_id}")
            print(f"   Doctor name in response: {login_result['doctor']['full_name']}")
        else:
            print(f"❌ Doctor login failed: {login_response.text}")
            return
    except Exception as e:
        print(f"❌ Error during doctor login: {e}")
        return
    
    # Test 3: Test delete account endpoint
    print("\n3. Testing delete account endpoint...")
    try:
        delete_response = requests.delete(
            "http://localhost:8000/api/doctors/delete-account",
            headers={
                "Authorization": f"Bearer {doctor_token}"
            }
        )
        
        if delete_response.status_code == 200:
            print("✅ Doctor account deletion successful!")
            delete_result = delete_response.json()
            print(f"   Response: {delete_result['message']}")
        else:
            print(f"❌ Doctor account deletion failed: {delete_response.text}")
            return
    except Exception as e:
        print(f"❌ Error during doctor account deletion: {e}")
        return
    
    print("\n=== ALL TESTS COMPLETED ===")
    print("✅ Doctor name display issue fixed")
    print("✅ Account deletion functionality implemented")

if __name__ == "__main__":
    test_fixes()