from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from src.config import config
from src.patients.models import Patient
from src.doctors.models import Doctor
from src.appointments.models import Appointment
from src.prescriptions.models import Prescription
from src.lab_reports.models import LabReport
from src.consents.models import Consent
from src.audit_logs.models import AuditLog
from src.doctor_patient.models import DoctorPatient
import logging


async_engine = create_async_engine(config.DATABASE_URL, echo=True, future=True)


async def init_db():
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


async def get_session():
    Session = sessionmaker(
        bind=async_engine,
        class_=AsyncSession,
        expire_on_commit=False
    )
    async with Session() as session:
        yield session