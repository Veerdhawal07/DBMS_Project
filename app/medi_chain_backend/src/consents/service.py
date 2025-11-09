import uuid
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from .models import Consent
from .schemas import ConsentCreate, ConsentUpdate
from src.patients.models import Patient
from src.doctors.models import Doctor
from typing import List
from datetime import datetime


class ConsentService:
    async def get_consent_by_id(self, consent_id: uuid.UUID, session: AsyncSession):
        statement = select(Consent).where(Consent.id == consent_id)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def get_consents_by_patient(self, patient_id: uuid.UUID, session: AsyncSession) -> List[Consent]:
        statement = select(Consent).where(Consent.patient_id == patient_id)
        result = await session.execute(statement)
        consents = result.scalars().all()
        return list(consents)

    async def get_consents_by_doctor(self, doctor_id: uuid.UUID, session: AsyncSession) -> List[Consent]:
        statement = select(Consent).where(Consent.doctor_id == doctor_id)
        result = await session.execute(statement)
        consents = result.scalars().all()
        return list(consents)

    async def create_consent(self, consent_data: ConsentCreate, session: AsyncSession):
        # Check if patient exists
        patient_statement = select(Patient).where(Patient.id == consent_data.patient_id)
        patient_result = await session.execute(patient_statement)
        patient = patient_result.scalar_one_or_none()
        
        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found"
            )

        # Check if doctor exists
        doctor_statement = select(Doctor).where(Doctor.id == consent_data.doctor_id)
        doctor_result = await session.execute(doctor_statement)
        doctor = doctor_result.scalar_one_or_none()
        
        if not doctor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found"
            )

        # Check if consent already exists
        consent_statement = select(Consent).where(
            Consent.patient_id == consent_data.patient_id,
            Consent.doctor_id == consent_data.doctor_id
        )
        consent_result = await session.execute(consent_statement)
        existing_consent = consent_result.scalar_one_or_none()
        
        if existing_consent:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Consent already exists"
            )

        new_consent = Consent(
            patient_id=consent_data.patient_id,
            doctor_id=consent_data.doctor_id,
        )
        session.add(new_consent)
        await session.commit()
        await session.refresh(new_consent)
        return new_consent

    async def update_consent(self, consent_id: uuid.UUID, consent_data: ConsentUpdate, session: AsyncSession):
        consent = await self.get_consent_by_id(consent_id, session)
        if not consent:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Consent not found"
            )

        # Update only provided fields
        if consent_data.access_status is not None:
            consent.access_status = consent_data.access_status
            
            # Update timestamps based on status
            if consent_data.access_status == "granted":
                consent.granted_at = datetime.utcnow()
                consent.revoked_at = None
            elif consent_data.access_status == "revoked":
                consent.revoked_at = datetime.utcnow()

        session.add(consent)
        await session.commit()
        await session.refresh(consent)
        return consent

    async def delete_consent(self, consent_id: uuid.UUID, session: AsyncSession):
        consent = await self.get_consent_by_id(consent_id, session)
        if not consent:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Consent not found"
            )

        await session.delete(consent)
        await session.commit()
        return {"message": "Consent deleted successfully"}