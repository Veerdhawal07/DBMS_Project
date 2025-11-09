import requests
import json

# Login as the doctor to get a token
doctor_login_data = {
    "email": "drsmith@example.com",
    "password": "doctorpass123"
}

print("Logging in as doctor...")
doctor_login_response = requests.post(
    "http://localhost:8000/api/doctors/login",
    headers={"Content-Type": "application/json"},
    data=json.dumps(doctor_login_data)
)

if doctor_login_response.status_code == 200:
    doctor_result = doctor_login_response.json()
    doctor_id = doctor_result["doctor"]["id"]
    doctor_token = doctor_result["access_token"]
    print(f"Doctor logged in with ID: {doctor_id}")
    
    # Get the patient ID from earlier
    patient_login_data = {
        "email": "test@example.com",
        "password": "password123"
    }
    
    patient_login_response = requests.post(
        "http://localhost:8000/api/patients/login",
        headers={"Content-Type": "application/json"},
        data=json.dumps(patient_login_data)
    )
    
    if patient_login_response.status_code == 200:
        patient_result = patient_login_response.json()
        patient_id = patient_result["patient"]["id"]
        print(f"Patient ID: {patient_id}")
        
        # Create a new prescription
        prescription_data = {
            "patient_id": patient_id,
            "doctor_id": doctor_id,
            "medication": "Paracetamol",
            "dosage": "500mg",
            "instructions": "Take twice daily"
        }
        
        print("\nCreating prescription...")
        prescription_response = requests.post(
            "http://localhost:8000/api/prescriptions/",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {doctor_token}"
            },
            data=json.dumps(prescription_data)
        )
        print(f"Prescription creation status: {prescription_response.status_code}")
        if prescription_response.status_code == 200:
            print("Prescription created successfully!")
            prescription_result = prescription_response.json()
            prescription_id = prescription_result['id']
            print(f"Prescription ID: {prescription_id}")
            
            # Now check audit logs for the doctor
            print("\nChecking audit logs for doctor...")
            audit_response = requests.get(
                f"http://localhost:8000/api/audit-logs/actor/{doctor_id}",
                headers={
                    "Authorization": f"Bearer {doctor_token}"
                }
            )
            print(f"Audit logs check status: {audit_response.status_code}")
            if audit_response.status_code == 200:
                audit_logs = audit_response.json()
                print(f"Audit logs found: {len(audit_logs)}")
                for log in audit_logs:
                    print(f"  - Action: {log['action']}, Target: {log['target_type']}, Timestamp: {log['timestamp']}")
            else:
                print(f"Audit logs check failed: {audit_response.text}")
                
            # Also check audit logs for the patient
            print("\nChecking audit logs for patient...")
            patient_audit_response = requests.get(
                f"http://localhost:8000/api/audit-logs/actor/{patient_id}",
                headers={
                    "Authorization": f"Bearer {doctor_token}"  # Using doctor token as we're making the request
                }
            )
            print(f"Patient audit logs check status: {patient_audit_response.status_code}")
            if patient_audit_response.status_code == 200:
                patient_audit_logs = patient_audit_response.json()
                print(f"Patient audit logs found: {len(patient_audit_logs)}")
                for log in patient_audit_logs:
                    print(f"  - Action: {log['action']}, Target: {log['target_type']}, Timestamp: {log['timestamp']}")
            else:
                print(f"Patient audit logs check failed: {patient_audit_response.text}")
        else:
            print(f"Prescription creation failed: {prescription_response.text}")
    else:
        print(f"Patient login failed: {patient_login_response.text}")
else:
    print(f"Doctor login failed: {doctor_login_response.text}")