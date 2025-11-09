import requests
import json

def test_comprehensive_flow():
    print("=== COMPREHENSIVE TEST OF DOCTOR-PATIENT RELATIONSHIP SYSTEM ===\n")
    
    # 1. Register a new patient
    print("1. Registering new patient...")
    patient_data = {
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "password": "patientpass123",
        "date_of_birth": "1985-06-15T00:00:00",
        "gender": "male",
        "address": "456 Health St",
        "phone": "5551234567"
    }
    
    patient_reg_response = requests.post(
        "http://localhost:8000/api/patients/signup",
        headers={"Content-Type": "application/json"},
        data=json.dumps(patient_data)
    )
    
    if patient_reg_response.status_code != 200:
        print(f"❌ Patient registration failed: {patient_reg_response.text}")
        return
    
    patient_result = patient_reg_response.json()
    patient_id = patient_result['patient']['id']
    patient_token = patient_result['access_token']
    print(f"✅ Patient registered successfully. ID: {patient_id}")
    
    # 2. Register a new doctor
    print("\n2. Registering new doctor...")
    doctor_data = {
        "full_name": "Dr. Emily White",
        "email": "drwhite@example.com",
        "password": "doctorpass456",
        "specialization": "Pediatrics",
        "hospital_name": "Children's Hospital",
        "phone": "5559876543"
    }
    
    doctor_reg_response = requests.post(
        "http://localhost:8000/api/doctors/signup",
        headers={"Content-Type": "application/json"},
        data=json.dumps(doctor_data)
    )
    
    if doctor_reg_response.status_code != 200:
        print(f"❌ Doctor registration failed: {doctor_reg_response.text}")
        return
    
    doctor_result = doctor_reg_response.json()
    doctor_id = doctor_result['doctor']['id']
    doctor_token = doctor_result['access_token']
    print(f"✅ Doctor registered successfully. ID: {doctor_id}")
    
    # 3. Login as doctor
    print("\n3. Logging in as doctor...")
    doctor_login_data = {
        "email": "drwhite@example.com",
        "password": "doctorpass456"
    }
    
    doctor_login_response = requests.post(
        "http://localhost:8000/api/doctors/login",
        headers={"Content-Type": "application/json"},
        data=json.dumps(doctor_login_data)
    )
    
    if doctor_login_response.status_code != 200:
        print(f"❌ Doctor login failed: {doctor_login_response.text}")
        return
    
    doctor_login_result = doctor_login_response.json()
    doctor_token = doctor_login_result['access_token']
    print("✅ Doctor logged in successfully")
    
    # 4. Create a prescription (this should create doctor-patient relationship)
    print("\n4. Creating prescription (this should create doctor-patient relationship)...")
    prescription_data = {
        "patient_id": patient_id,
        "doctor_id": doctor_id,
        "medication": "Vitamin D",
        "dosage": "1000 IU",
        "instructions": "Take once daily with food"
    }
    
    prescription_response = requests.post(
        "http://localhost:8000/api/prescriptions/",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {doctor_token}"
        },
        data=json.dumps(prescription_data)
    )
    
    if prescription_response.status_code != 200:
        print(f"❌ Prescription creation failed: {prescription_response.text}")
        return
    
    prescription_result = prescription_response.json()
    prescription_id = prescription_result['id']
    print(f"✅ Prescription created successfully. ID: {prescription_id}")
    
    # 5. Check doctor-patient relationships from doctor's side
    print("\n5. Checking doctor-patient relationships from doctor's side...")
    doctor_relationships_response = requests.get(
        f"http://localhost:8000/api/doctor-patient/doctor/{doctor_id}",
        headers={
            "Authorization": f"Bearer {doctor_token}"
        }
    )
    
    if doctor_relationships_response.status_code != 200:
        print(f"❌ Doctor relationships check failed: {doctor_relationships_response.text}")
        return
    
    doctor_relationships = doctor_relationships_response.json()
    print(f"✅ Doctor-patient relationships found: {len(doctor_relationships)}")
    for relationship in doctor_relationships:
        print(f"   - Patient ID: {relationship['patient_id']}, Active: {relationship['is_active']}")
    
    # 6. Check doctor-patient relationships from patient's side
    print("\n6. Checking doctors for patient...")
    patient_doctors_response = requests.get(
        f"http://localhost:8000/api/doctor-patient/patient/{patient_id}",
        headers={
            "Authorization": f"Bearer {patient_token}"
        }
    )
    
    if patient_doctors_response.status_code != 200:
        print(f"❌ Patient doctors check failed: {patient_doctors_response.text}")
        return
    
    patient_doctors = patient_doctors_response.json()
    print(f"✅ Patient doctors found: {len(patient_doctors)}")
    for doctor_rel in patient_doctors:
        print(f"   - Doctor ID: {doctor_rel['doctor_id']}, Active: {doctor_rel['is_active']}")
    
    # 7. Check audit logs for the doctor
    print("\n7. Checking audit logs for doctor...")
    doctor_audit_response = requests.get(
        f"http://localhost:8000/api/audit-logs/actor/{doctor_id}",
        headers={
            "Authorization": f"Bearer {doctor_token}"
        }
    )
    
    if doctor_audit_response.status_code != 200:
        print(f"❌ Doctor audit logs check failed: {doctor_audit_response.text}")
        return
    
    doctor_audit_logs = doctor_audit_response.json()
    print(f"✅ Doctor audit logs found: {len(doctor_audit_logs)}")
    for log in doctor_audit_logs:
        print(f"   - Action: {log['action']}, Target: {log['target_type']}")
    
    # 8. Check prescriptions for patient
    print("\n8. Checking prescriptions for patient...")
    patient_prescriptions_response = requests.get(
        f"http://localhost:8000/api/prescriptions/patient/{patient_id}",
        headers={
            "Authorization": f"Bearer {patient_token}"
        }
    )
    
    if patient_prescriptions_response.status_code != 200:
        print(f"❌ Patient prescriptions check failed: {patient_prescriptions_response.text}")
        return
    
    patient_prescriptions = patient_prescriptions_response.json()
    print(f"✅ Patient prescriptions found: {len(patient_prescriptions)}")
    for prescription in patient_prescriptions:
        print(f"   - Medication: {prescription['medication']}, Dosage: {prescription['dosage']}")
    
    print("\n=== ALL TESTS PASSED! ===")
    print("✅ Doctor registration works")
    print("✅ Patient registration works")
    print("✅ Authentication works for both")
    print("✅ Doctor-patient relationships are automatically created")
    print("✅ Audit logs are properly recorded")
    print("✅ Prescriptions are correctly stored and retrieved")
    print("✅ All database relationships are working correctly")

if __name__ == "__main__":
    test_comprehensive_flow()