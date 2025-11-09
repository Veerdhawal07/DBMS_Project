import requests
import json

# Login as patient
patient_login_data = {
    "email": "test3@example.com",
    "password": "password123"
}

print("Testing patient login...")
try:
    patient_login_response = requests.post(
        "http://localhost:8000/api/patients/login",
        headers={"Content-Type": "application/json"},
        data=json.dumps(patient_login_data)
    )
    print(f"Patient Login Status Code: {patient_login_response.status_code}")
    
    if patient_login_response.status_code == 200:
        print("Patient login successful!")
        patient_result = patient_login_response.json()
        patient_id = patient_result['patient']['id']
        print(f"Patient ID: {patient_id}")
        
        # Check doctors for this patient
        print("\nChecking doctors for this patient...")
        doctors_response = requests.get(
            f"http://localhost:8000/api/doctor-patient/patient/{patient_id}",
            headers={
                "Authorization": f"Bearer {patient_result['access_token']}"
            }
        )
        print(f"Doctors check Status Code: {doctors_response.status_code}")
        
        if doctors_response.status_code == 200:
            doctors = doctors_response.json()
            print(f"Doctors found: {len(doctors)}")
            for doctor in doctors:
                print(f"  - Doctor ID: {doctor['doctor_id']}, Active: {doctor['is_active']}")
        else:
            print(f"Doctors check failed: {doctors_response.text}")
            
        # Test audit logs for this patient
        print("\nChecking audit logs for this patient...")
        audit_response = requests.get(
            f"http://localhost:8000/api/audit-logs/actor/{patient_id}",
            headers={
                "Authorization": f"Bearer {patient_result['access_token']}"
            }
        )
        print(f"Audit logs check Status Code: {audit_response.status_code}")
        
        if audit_response.status_code == 200:
            audit_logs = audit_response.json()
            print(f"Audit logs found: {len(audit_logs)}")
            for log in audit_logs:
                print(f"  - Action: {log['action']}, Timestamp: {log['timestamp']}")
        else:
            print(f"Audit logs check failed: {audit_response.text}")
    else:
        print("Patient login failed!")
        print(f"Login response: {patient_login_response.text}")
        
except Exception as e:
    print(f"Error: {e}")