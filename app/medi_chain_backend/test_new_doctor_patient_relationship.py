import requests
import json

# Login as the new doctor
doctor_login_data = {
    "email": "drjohnson@example.com",
    "password": "neuropass123"
}

print("Testing new doctor login...")
try:
    doctor_login_response = requests.post(
        "http://localhost:8000/api/doctors/login",
        headers={"Content-Type": "application/json"},
        data=json.dumps(doctor_login_data)
    )
    print(f"Doctor Login Status Code: {doctor_login_response.status_code}")
    
    if doctor_login_response.status_code == 200:
        print("New doctor login successful!")
        doctor_result = doctor_login_response.json()
        doctor_id = doctor_result['doctor']['id']
        doctor_token = doctor_result['access_token']
        print(f"Doctor ID: {doctor_id}")
        
        # Get a patient to work with
        patient_login_data = {
            "email": "test3@example.com",
            "password": "password123"
        }
        
        print("\nGetting patient for relationship test...")
        patient_login_response = requests.post(
            "http://localhost:8000/api/patients/login",
            headers={"Content-Type": "application/json"},
            data=json.dumps(patient_login_data)
        )
        
        if patient_login_response.status_code == 200:
            patient_result = patient_login_response.json()
            patient_id = patient_result['patient']['id']
            print(f"Patient ID: {patient_id}")
            
            # Create a prescription which should create doctor-patient relationship
            prescription_data = {
                "patient_id": patient_id,
                "doctor_id": doctor_id,
                "medication": "Neurovit",
                "dosage": "500mg",
                "instructions": "Take twice daily"
            }
            
            print("\nCreating prescription with new doctor...")
            prescription_response = requests.post(
                "http://localhost:8000/api/prescriptions/",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {doctor_token}"
                },
                data=json.dumps(prescription_data)
            )
            print(f"Prescription Status Code: {prescription_response.status_code}")
            
            if prescription_response.status_code == 200:
                print("Prescription created successfully!")
                prescription_result = prescription_response.json()
                prescription_id = prescription_result['id']
                print(f"Prescription ID: {prescription_id}")
                
                # Check if doctor-patient relationship was created
                print("\nChecking doctor-patient relationships for new doctor...")
                relationship_response = requests.get(
                    f"http://localhost:8000/api/doctor-patient/doctor/{doctor_id}",
                    headers={
                        "Authorization": f"Bearer {doctor_token}"
                    }
                )
                print(f"Relationship check Status Code: {relationship_response.status_code}")
                
                if relationship_response.status_code == 200:
                    relationships = relationship_response.json()
                    print(f"Doctor-patient relationships found: {len(relationships)}")
                    for relationship in relationships:
                        print(f"  - Patient ID: {relationship['patient_id']}, Active: {relationship['is_active']}")
                        
                    # Check from patient's side as well
                    print("\nChecking doctors for patient...")
                    patient_doctors_response = requests.get(
                        f"http://localhost:8000/api/doctor-patient/patient/{patient_id}",
                        headers={
                            "Authorization": f"Bearer {patient_result['access_token']}"
                        }
                    )
                    print(f"Patient doctors check Status Code: {patient_doctors_response.status_code}")
                    
                    if patient_doctors_response.status_code == 200:
                        patient_doctors = patient_doctors_response.json()
                        print(f"Patient doctors found: {len(patient_doctors)}")
                        for doctor_rel in patient_doctors:
                            print(f"  - Doctor ID: {doctor_rel['doctor_id']}, Active: {doctor_rel['is_active']}")
                    else:
                        print(f"Patient doctors check failed: {patient_doctors_response.text}")
                else:
                    print(f"Relationship check failed: {relationship_response.text}")
            else:
                print(f"Prescription creation failed: {prescription_response.text}")
        else:
            print(f"Patient login failed: {patient_login_response.text}")
    else:
        print("Doctor login failed!")
        print(f"Login response: {doctor_login_response.text}")
        
except Exception as e:
    print(f"Error: {e}")