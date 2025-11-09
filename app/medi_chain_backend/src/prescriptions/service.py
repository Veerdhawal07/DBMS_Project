import uuid
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from .models import Prescription
from .schemas import PrescriptionCreate, PrescriptionUpdate
from src.patients.models import Patient
from src.doctors.models import Doctor
from src.doctor_patient.models import DoctorPatient
from src.doctor_patient.service import DoctorPatientService
from src.audit_logs.models import AuditLog
from typing import List, Optional


class PrescriptionService:
    def __init__(self):
        self.doctor_patient_service = DoctorPatientService()

    async def get_prescription_by_id(self, prescription_id: uuid.UUID, session: AsyncSession):
        statement = select(Prescription).where(Prescription.id == prescription_id)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def get_prescriptions_by_patient(self, patient_id: uuid.UUID, session: AsyncSession) -> List[Prescription]:
        statement = select(Prescription).where(Prescription.patient_id == patient_id)
        result = await session.execute(statement)
        prescriptions = result.scalars().all()
        return list(prescriptions)

    async def get_prescriptions_by_doctor(self, doctor_id: uuid.UUID, session: AsyncSession) -> List[Prescription]:
        statement = select(Prescription).where(Prescription.doctor_id == doctor_id)
        result = await session.execute(statement)
        prescriptions = result.scalars().all()
        return list(prescriptions)

    async def create_prescription(self, prescription_data: PrescriptionCreate, session: AsyncSession, actor_id: Optional[uuid.UUID] = None):
        # Check if patient exists
        patient_statement = select(Patient).where(Patient.id == prescription_data.patient_id)
        patient_result = await session.execute(patient_statement)
        patient = patient_result.scalar_one_or_none()
        
        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found"
            )

        # Check if doctor exists
        doctor_statement = select(Doctor).where(Doctor.id == prescription_data.doctor_id)
        doctor_result = await session.execute(doctor_statement)
        doctor = doctor_result.scalar_one_or_none()
        
        if not doctor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found"
            )

        # Create doctor-patient relationship if it doesn't exist
        try:
            from src.doctor_patient.schemas import DoctorPatientCreate
            doctor_patient_data = DoctorPatientCreate(
                doctor_id=prescription_data.doctor_id,
                patient_id=prescription_data.patient_id
            )
            await self.doctor_patient_service.create_doctor_patient(doctor_patient_data, session)
        except Exception as e:
            # If relationship already exists, that's fine
            pass

        new_prescription = Prescription(
            patient_id=prescription_data.patient_id,
            doctor_id=prescription_data.doctor_id,
            medication=prescription_data.medication,
            dosage=prescription_data.dosage,
            instructions=prescription_data.instructions,
        )
        session.add(new_prescription)
        await session.commit()
        await session.refresh(new_prescription)
        
        # Create audit log
        if actor_id:
            audit_log = AuditLog(
                actor_id=actor_id,
                action="CREATE_PRESCRIPTION",
                target_type="prescription",
                target_id=new_prescription.id
            )
            session.add(audit_log)
            await session.commit()
        
        return new_prescription

    async def update_prescription(self, prescription_id: uuid.UUID, prescription_data: PrescriptionUpdate, session: AsyncSession, actor_id: Optional[uuid.UUID] = None):
        prescription = await self.get_prescription_by_id(prescription_id, session)
        if not prescription:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Prescription not found"
            )

        # Update only provided fields
        old_values = {}
        if prescription_data.medication is not None:
            old_values['medication'] = prescription.medication
            prescription.medication = prescription_data.medication
        if prescription_data.dosage is not None:
            old_values['dosage'] = prescription.dosage
            prescription.dosage = prescription_data.dosage
        if prescription_data.instructions is not None:
            old_values['instructions'] = prescription.instructions
            prescription.instructions = prescription_data.instructions

        session.add(prescription)
        await session.commit()
        await session.refresh(prescription)
        
        # Create audit log
        if actor_id:
            audit_log = AuditLog(
                actor_id=actor_id,
                action="UPDATE_PRESCRIPTION",
                target_type="prescription",
                target_id=prescription.id
            )
            session.add(audit_log)
            await session.commit()
        
        return prescription

    async def delete_prescription(self, prescription_id: uuid.UUID, session: AsyncSession, actor_id: Optional[uuid.UUID] = None):
        prescription = await self.get_prescription_by_id(prescription_id, session)
        if not prescription:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Prescription not found"
            )

        await session.delete(prescription)
        await session.commit()
        
        # Create audit log
        if actor_id:
            audit_log = AuditLog(
                actor_id=actor_id,
                action="DELETE_PRESCRIPTION",
                target_type="prescription",
                target_id=prescription_id
            )
            session.add(audit_log)
            await session.commit()
        
        return {"message": "Prescription deleted successfully"}