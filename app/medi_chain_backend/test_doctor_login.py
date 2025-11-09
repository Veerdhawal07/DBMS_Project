import requests
import json

# Test doctor login with existing credentials
login_data = {
    "email": "drsmith@example.com",
    "password": "doctorpass123"
}

print("Testing doctor login...")
try:
    login_response = requests.post(
        "http://localhost:8000/api/doctors/login",
        headers={"Content-Type": "application/json"},
        data=json.dumps(login_data)
    )
    print(f"Login Status Code: {login_response.status_code}")
    
    if login_response.status_code == 200:
        print("Doctor login successful!")
        login_result = login_response.json()
        doctor_id = login_result['doctor']['id']
        print(f"Logged in doctor ID: {doctor_id}")
        
        # Test creating a prescription which should create doctor-patient relationship
        # First, let's get a patient ID
        patient_login_data = {
            "email": "test3@example.com",
            "password": "password123"
        }
        
        print("\nGetting patient ID...")
        patient_login_response = requests.post(
            "http://localhost:8000/api/patients/login",
            headers={"Content-Type": "application/json"},
            data=json.dumps(patient_login_data)
        )
        
        if patient_login_response.status_code == 200:
            patient_result = patient_login_response.json()
            patient_id = patient_result['patient']['id']
            print(f"Patient ID: {patient_id}")
            
            # Now create a prescription
            prescription_data = {
                "patient_id": patient_id,
                "doctor_id": doctor_id,
                "medication": "Aspirin",
                "dosage": "100mg",
                "instructions": "Take once daily with food"
            }
            
            print("\nCreating prescription...")
            prescription_response = requests.post(
                "http://localhost:8000/api/prescriptions/",
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {login_result['access_token']}"
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
                print("\nChecking doctor-patient relationships...")
                relationship_response = requests.get(
                    f"http://localhost:8000/api/doctor-patient/doctor/{doctor_id}",
                    headers={
                        "Authorization": f"Bearer {login_result['access_token']}"
                    }
                )
                print(f"Relationship check Status Code: {relationship_response.status_code}")
                
                if relationship_response.status_code == 200:
                    relationships = relationship_response.json()
                    print(f"Doctor-patient relationships found: {len(relationships)}")
                    for relationship in relationships:
                        print(f"  - Patient ID: {relationship['patient_id']}, Active: {relationship['is_active']}")
                else:
                    print(f"Relationship check failed: {relationship_response.text}")
            else:
                print(f"Prescription creation failed: {prescription_response.text}")
        else:
            print(f"Patient login failed: {patient_login_response.text}")
    else:
        print("Doctor login failed!")
        print(f"Login response: {login_response.text}")
        
except Exception as e:
    print(f"Error: {e}")