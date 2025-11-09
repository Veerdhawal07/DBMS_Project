import requests
import json

# First, let's create a doctor
doctor_data = {
    "full_name": "Dr. Smith",
    "email": "drsmith@example.com",
    "password": "doctorpass123",
    "specialization": "Cardiology",
    "hospital_name": "City Hospital",
    "phone": "9876543210"
}

print("Creating doctor...")
doctor_response = requests.post(
    "http://localhost:8000/api/doctors/signup",
    headers={"Content-Type": "application/json"},
    data=json.dumps(doctor_data)
)
print(f"Doctor creation status: {doctor_response.status_code}")

if doctor_response.status_code == 200:
    doctor_result = doctor_response.json()
    doctor_id = doctor_result["doctor"]["id"]
    doctor_token = doctor_result["access_token"]
    print(f"Doctor created with ID: {doctor_id}")
else:
    print(f"Doctor creation failed: {doctor_response.text}")
    # Try to login instead
    login_data = {
        "email": "drsmith@example.com",
        "password": "doctorpass123"
    }
    login_response = requests.post(
        "http://localhost:8000/api/doctors/login",
        headers={"Content-Type": "application/json"},
        data=json.dumps(login_data)
    )
    if login_response.status_code == 200:
        login_result = login_response.json()
        doctor_id = login_result["doctor"]["id"]
        doctor_token = login_result["access_token"]
        print(f"Doctor logged in with ID: {doctor_id}")
    else:
        print(f"Doctor login failed: {login_response.text}")
        exit()

# Now let's use the existing patient we created earlier
# We'll need to login as the patient to get a token
patient_login_data = {
    "email": "test@example.com",
    "password": "password123"
}

print("\nLogging in as patient...")
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
    
    # Now let's create a prescription which should automatically create the doctor-patient relationship
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
            "Authorization": f"Bearer {doctor_token}"
        },
        data=json.dumps(prescription_data)
    )
    print(f"Prescription creation status: {prescription_response.status_code}")
    if prescription_response.status_code == 200:
        print("Prescription created successfully!")
        prescription_result = prescription_response.json()
        print(f"Prescription ID: {prescription_result['id']}")
    else:
        print(f"Prescription creation failed: {prescription_response.text}")
        
    # Let's check if the doctor-patient relationship was created
    print("\nChecking doctor-patient relationships...")
    relationship_response = requests.get(
        f"http://localhost:8000/api/doctor-patient/doctor/{doctor_id}",
        headers={
            "Authorization": f"Bearer {doctor_token}"
        }
    )
    print(f"Relationship check status: {relationship_response.status_code}")
    if relationship_response.status_code == 200:
        relationships = relationship_response.json()
        print(f"Doctor-patient relationships found: {len(relationships)}")
        for relationship in relationships:
            print(f"  - Patient ID: {relationship['patient_id']}")
    else:
        print(f"Relationship check failed: {relationship_response.text}")
else:
    print(f"Patient login failed: {patient_login_response.text}")