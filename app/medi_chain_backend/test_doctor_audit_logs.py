import requests
import json

# Login as doctor
doctor_login_data = {
    "email": "drsmith@example.com",
    "password": "doctorpass123"
}

print("Testing doctor login...")
try:
    doctor_login_response = requests.post(
        "http://localhost:8000/api/doctors/login",
        headers={"Content-Type": "application/json"},
        data=json.dumps(doctor_login_data)
    )
    print(f"Doctor Login Status Code: {doctor_login_response.status_code}")
    
    if doctor_login_response.status_code == 200:
        print("Doctor login successful!")
        doctor_result = doctor_login_response.json()
        doctor_id = doctor_result['doctor']['id']
        print(f"Doctor ID: {doctor_id}")
        
        # Check audit logs for this doctor
        print("\nChecking audit logs for this doctor...")
        audit_response = requests.get(
            f"http://localhost:8000/api/audit-logs/actor/{doctor_id}",
            headers={
                "Authorization": f"Bearer {doctor_result['access_token']}"
            }
        )
        print(f"Audit logs check Status Code: {audit_response.status_code}")
        
        if audit_response.status_code == 200:
            audit_logs = audit_response.json()
            print(f"Audit logs found: {len(audit_logs)}")
            for log in audit_logs:
                print(f"  - Action: {log['action']}, Target: {log['target_type']}, Timestamp: {log['timestamp']}")
        else:
            print(f"Audit logs check failed: {audit_response.text}")
    else:
        print("Doctor login failed!")
        print(f"Login response: {doctor_login_response.text}")
        
except Exception as e:
    print(f"Error: {e}")