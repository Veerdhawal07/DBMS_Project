from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from .models import Patient
from src.utils import generate_password_hash, verify_password
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class PatientService:
    async def get_patient_by_email(self, email: str, session: AsyncSession):
        logger.info(f"Getting patient by email: {email}")
        statement = select(Patient).where(Patient.email == email)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def patient_exists(self, email: str, session: AsyncSession):
        logger.info(f"Checking if patient exists: {email}")
        patient = await self.get_patient_by_email(email, session)
        return patient is not None

    async def register_patient(self, patient_data, session: AsyncSession):
        logger.info(f"Registering patient: {patient_data}")
        if await self.patient_exists(patient_data.email, session):
            logger.warning(f"Patient already exists: {patient_data.email}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Patient already exists"
            )

        password_hash = generate_password_hash(patient_data.password)
        logger.info(f"Password hash created for: {patient_data.email}")
        
        new_patient = Patient(
            full_name=patient_data.full_name,
            email=patient_data.email,
            password_hash=password_hash,
            date_of_birth=patient_data.date_of_birth,
            gender=patient_data.gender,
            address=patient_data.address,
            phone=patient_data.phone,
        )
        logger.info(f"Patient object created: {new_patient}")
        
        session.add(new_patient)
        logger.info("Patient added to session")
        
        await session.commit()
        logger.info("Session committed")
        
        await session.refresh(new_patient)
        logger.info("Patient refreshed")
        
        return new_patient

    async def authenticate_patient(self, email: str, password: str, session: AsyncSession):
        logger.info(f"Authenticating patient: {email}")
        patient = await self.get_patient_by_email(email, session)
        if not patient or not verify_password(password, patient.password_hash):
            logger.warning(f"Invalid email or password for: {email}")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Invalid email or password"
            )
        return patient

    # Add delete account method
    async def delete_patient(self, patient_id: str, session: AsyncSession):
        from uuid import UUID
        logger.info(f"Deleting patient: {patient_id}")
        statement = select(Patient).where(Patient.id == UUID(patient_id))
        result = await session.execute(statement)
        patient = result.scalar_one_or_none()
        
        if not patient:
            logger.warning(f"Patient not found: {patient_id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found"
            )
        
        await session.delete(patient)
        await session.commit()
        logger.info(f"Patient deleted: {patient_id}")
        return {"message": "Patient account deleted successfully"}