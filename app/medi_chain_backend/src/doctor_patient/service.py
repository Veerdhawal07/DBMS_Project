import uuid
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from .models import DoctorPatient
from .schemas import DoctorPatientCreate, DoctorPatientUpdate
from src.patients.models import Patient
from src.doctors.models import Doctor
from typing import List


class DoctorPatientService:
    async def get_doctor_patient_by_id(self, doctor_patient_id: uuid.UUID, session: AsyncSession):
        statement = select(DoctorPatient).where(DoctorPatient.id == doctor_patient_id)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def get_doctors_by_patient(self, patient_id: uuid.UUID, session: AsyncSession) -> List[DoctorPatient]:
        statement = select(DoctorPatient).where(DoctorPatient.patient_id == patient_id)
        result = await session.execute(statement)
        doctors = result.scalars().all()
        return list(doctors)

    async def get_patients_by_doctor(self, doctor_id: uuid.UUID, session: AsyncSession) -> List[DoctorPatient]:
        statement = select(DoctorPatient).where(DoctorPatient.doctor_id == doctor_id)
        result = await session.execute(statement)
        patients = result.scalars().all()
        return list(patients)

    async def create_doctor_patient(self, doctor_patient_data: DoctorPatientCreate, session: AsyncSession):
        # Check if patient exists
        patient_statement = select(Patient).where(Patient.id == doctor_patient_data.patient_id)
        patient_result = await session.execute(patient_statement)
        patient = patient_result.scalar_one_or_none()
        
        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found"
            )

        # Check if doctor exists
        doctor_statement = select(Doctor).where(Doctor.id == doctor_patient_data.doctor_id)
        doctor_result = await session.execute(doctor_statement)
        doctor = doctor_result.scalar_one_or_none()
        
        if not doctor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found"
            )

        # Check if relationship already exists
        existing_statement = select(DoctorPatient).where(
            DoctorPatient.doctor_id == doctor_patient_data.doctor_id,
            DoctorPatient.patient_id == doctor_patient_data.patient_id
        )
        existing_result = await session.execute(existing_statement)
        existing_relationship = existing_result.scalar_one_or_none()
        
        if existing_relationship:
            # If relationship exists but is inactive, reactivate it
            if not existing_relationship.is_active:
                existing_relationship.is_active = True
                session.add(existing_relationship)
                await session.commit()
                await session.refresh(existing_relationship)
                return existing_relationship
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail="Doctor-patient relationship already exists"
                )

        new_doctor_patient = DoctorPatient(
            doctor_id=doctor_patient_data.doctor_id,
            patient_id=doctor_patient_data.patient_id,
            relationship_type=doctor_patient_data.relationship_type,
        )
        session.add(new_doctor_patient)
        await session.commit()
        await session.refresh(new_doctor_patient)
        return new_doctor_patient

    async def update_doctor_patient(self, doctor_patient_id: uuid.UUID, doctor_patient_data: DoctorPatientUpdate, session: AsyncSession):
        doctor_patient = await self.get_doctor_patient_by_id(doctor_patient_id, session)
        if not doctor_patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Doctor-patient relationship not found"
            )

        # Update only provided fields
        if doctor_patient_data.relationship_type is not None:
            doctor_patient.relationship_type = doctor_patient_data.relationship_type
        if doctor_patient_data.is_active is not None:
            doctor_patient.is_active = doctor_patient_data.is_active

        session.add(doctor_patient)
        await session.commit()
        await session.refresh(doctor_patient)
        return doctor_patient

    async def delete_doctor_patient(self, doctor_patient_id: uuid.UUID, session: AsyncSession):
        doctor_patient = await self.get_doctor_patient_by_id(doctor_patient_id, session)
        if not doctor_patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Doctor-patient relationship not found"
            )

        await session.delete(doctor_patient)
        await session.commit()
        return {"message": "Doctor-patient relationship deleted successfully"}