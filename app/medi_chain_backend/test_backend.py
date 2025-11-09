import asyncio
import uuid
from src.config import config
from src.db.main import init_db, get_session
from src.patients.models import Patient
from src.patients.schemas import PatientRegister
from src.patients.service import PatientService
from src.utils import verify_password


async def test_backend():
    # Initialize the database
    await init_db()
    
    # Create a test patient
    patient_service = PatientService()
    
    # Test data
    patient_data = PatientRegister(
        full_name="John Doe",
        email="john.doe@example.com",
        password="securepassword123",
        date_of_birth="1990-01-01",
        gender="Male",
        address="123 Main St",
        phone="555-1234"
    )
    
    # Get a database session
    async for session in get_session():
        # Register the patient
        try:
            new_patient = await patient_service.register_patient(patient_data, session)
            print(f"Patient registered successfully: {new_patient.full_name}")
            print(f"Patient ID: {new_patient.id}")
            
            # Test authentication
            authenticated_patient = await patient_service.authenticate_patient(
                "john.doe@example.com", "securepassword123", session
            )
            print(f"Patient authenticated successfully: {authenticated_patient.full_name}")
            
            # Verify password hashing works
            is_password_correct = verify_password("securepassword123", new_patient.password_hash)
            print(f"Password verification: {is_password_correct}")
            
            # Test getting patient by email
            patient_by_email = await patient_service.get_patient_by_email("john.doe@example.com", session)
            print(f"Patient retrieved by email: {patient_by_email.full_name}")
            
        except Exception as e:
            print(f"Error: {e}")
        break  # We only need one session


if __name__ == "__main__":
    asyncio.run(test_backend())