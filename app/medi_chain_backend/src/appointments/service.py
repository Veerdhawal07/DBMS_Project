import uuid
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from .models import Appointment
from .schemas import AppointmentCreate, AppointmentUpdate
from src.patients.models import Patient
from src.doctors.models import Doctor
from src.doctor_patient.models import DoctorPatient
from src.doctor_patient.service import DoctorPatientService
from src.audit_logs.models import AuditLog
from typing import List, Optional


class AppointmentService:
    def __init__(self):
        self.doctor_patient_service = DoctorPatientService()

    async def get_appointment_by_id(self, appointment_id: uuid.UUID, session: AsyncSession):
        statement = select(Appointment).where(Appointment.id == appointment_id)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def get_appointments_by_patient(self, patient_id: uuid.UUID, session: AsyncSession) -> List[Appointment]:
        statement = select(Appointment).where(Appointment.patient_id == patient_id)
        result = await session.execute(statement)
        appointments = result.scalars().all()
        return list(appointments)

    async def get_appointments_by_doctor(self, doctor_id: uuid.UUID, session: AsyncSession) -> List[Appointment]:
        statement = select(Appointment).where(Appointment.doctor_id == doctor_id)
        result = await session.execute(statement)
        appointments = result.scalars().all()
        return list(appointments)

    async def create_appointment(self, appointment_data: AppointmentCreate, session: AsyncSession, actor_id: Optional[uuid.UUID] = None):
        # Check if patient exists
        patient_statement = select(Patient).where(Patient.id == appointment_data.patient_id)
        patient_result = await session.execute(patient_statement)
        patient = patient_result.scalar_one_or_none()
        
        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found"
            )

        # Check if doctor exists
        doctor_statement = select(Doctor).where(Doctor.id == appointment_data.doctor_id)
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
                doctor_id=appointment_data.doctor_id,
                patient_id=appointment_data.patient_id
            )
            await self.doctor_patient_service.create_doctor_patient(doctor_patient_data, session)
        except Exception as e:
            # If relationship already exists, that's fine
            pass

        new_appointment = Appointment(
            patient_id=appointment_data.patient_id,
            doctor_id=appointment_data.doctor_id,
            appointment_date=appointment_data.appointment_date,
            reason=appointment_data.reason,
            notes=appointment_data.notes,
        )
        session.add(new_appointment)
        await session.commit()
        await session.refresh(new_appointment)
        
        # Create audit log
        if actor_id:
            audit_log = AuditLog(
                actor_id=actor_id,
                action="CREATE_APPOINTMENT",
                target_type="appointment",
                target_id=new_appointment.id
            )
            session.add(audit_log)
            await session.commit()
        
        return new_appointment

    async def update_appointment(self, appointment_id: uuid.UUID, appointment_data: AppointmentUpdate, session: AsyncSession, actor_id: Optional[uuid.UUID] = None):
        appointment = await self.get_appointment_by_id(appointment_id, session)
        if not appointment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found"
            )

        # Update only provided fields
        if appointment_data.appointment_date is not None:
            appointment.appointment_date = appointment_data.appointment_date
        if appointment_data.reason is not None:
            appointment.reason = appointment_data.reason
        if appointment_data.notes is not None:
            appointment.notes = appointment_data.notes
        if appointment_data.status is not None:
            appointment.status = appointment_data.status

        session.add(appointment)
        await session.commit()
        await session.refresh(appointment)
        
        # Create audit log
        if actor_id:
            audit_log = AuditLog(
                actor_id=actor_id,
                action="UPDATE_APPOINTMENT",
                target_type="appointment",
                target_id=appointment.id
            )
            session.add(audit_log)
            await session.commit()
        
        return appointment

    async def delete_appointment(self, appointment_id: uuid.UUID, session: AsyncSession, actor_id: Optional[uuid.UUID] = None):
        appointment = await self.get_appointment_by_id(appointment_id, session)
        if not appointment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found"
            )

        await session.delete(appointment)
        await session.commit()
        
        # Create audit log
        if actor_id:
            audit_log = AuditLog(
                actor_id=actor_id,
                action="DELETE_APPOINTMENT",
                target_type="appointment",
                target_id=appointment_id
            )
            session.add(audit_log)
            await session.commit()
        
        return {"message": "Appointment deleted successfully"}