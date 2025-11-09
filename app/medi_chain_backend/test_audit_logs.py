import requests
import json

# Login as the patient to get a token
patient_login_data = {
    "email": "test@example.com",
    "password": "password123"
}

print("Logging in as patient...")
patient_login_response = requests.post(
    "http://localhost:8000/api/patients/login",
    headers={"Content-Type": "application/json"},
    data=json.dumps(patient_login_data)
)

if patient_login_response.status_code == 200:
    patient_result = patient_login_response.json()
    patient_id = patient_result["patient"]["id"]
    patient_token = patient_result["access_token"]
    print(f"Patient logged in with ID: {patient_id}")
    
    # Check audit logs for this patient
    print("\nChecking audit logs...")
    audit_response = requests.get(
        f"http://localhost:8000/api/audit-logs/actor/{patient_id}",
        headers={
            "Authorization": f"Bearer {patient_token}"
        }
    )
    print(f"Audit logs check status: {audit_response.status_code}")
    if audit_response.status_code == 200:
        audit_logs = audit_response.json()
        print(f"Audit logs found: {len(audit_logs)}")
        for log in audit_logs:
            print(f"  - Action: {log['action']}, Timestamp: {log['timestamp']}")
    else:
        print(f"Audit logs check failed: {audit_response.text}")
else:
    print(f"Patient login failed: {patient_login_response.text}")