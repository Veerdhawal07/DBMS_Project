from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from .models import Patient
from src.utils import generate_password_hash, verify_password


class PatientService:
    async def get_patient_by_email(self, email: str, session: AsyncSession):
        statement = select(Patient).where(Patient.email == email)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def patient_exists(self, email: str, session: AsyncSession):
        patient = await self.get_patient_by_email(email, session)
        return patient is not None

    async def register_patient(self, patient_data, session: AsyncSession):
        if await self.patient_exists(patient_data.email, session):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Patient already exists"
            )

        password_hash = generate_password_hash(patient_data.password)
        new_patient = Patient(
            full_name=patient_data.full_name,
            email=patient_data.email,
            password_hash=password_hash,
            date_of_birth=patient_data.date_of_birth,
            gender=patient_data.gender,
            address=patient_data.address,
            phone=patient_data.phone,
        )
        session.add(new_patient)
        await session.commit()
        await session.refresh(new_patient)
        return new_patient

    async def authenticate_patient(self, email: str, password: str, session: AsyncSession):
        patient = await self.get_patient_by_email(email, session)
        if not patient or not verify_password(password, patient.password_hash):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Invalid email or password"
            )
        return patient