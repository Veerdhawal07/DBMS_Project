import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from src.db.main import get_session
from .schemas import DoctorPatientCreate, DoctorPatientUpdate, DoctorPatientResponse
from .service import DoctorPatientService
from src.dependencies import AccessTokenBearer

doctor_patient_router = APIRouter()

doctor_patient_service = DoctorPatientService()
access_token_bearer = AccessTokenBearer()


@doctor_patient_router.post("/", response_model=DoctorPatientResponse)
async def create_doctor_patient(
    doctor_patient_data: DoctorPatientCreate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    new_doctor_patient = await doctor_patient_service.create_doctor_patient(doctor_patient_data, session)
    return new_doctor_patient


@doctor_patient_router.get("/doctor/{doctor_id}", response_model=List[DoctorPatientResponse])
async def get_patients_by_doctor(
    doctor_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    patients = await doctor_patient_service.get_patients_by_doctor(uuid.UUID(doctor_id), session)
    return patients


@doctor_patient_router.get("/patient/{patient_id}", response_model=List[DoctorPatientResponse])
async def get_doctors_by_patient(
    patient_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    doctors = await doctor_patient_service.get_doctors_by_patient(uuid.UUID(patient_id), session)
    return doctors


@doctor_patient_router.put("/{doctor_patient_id}", response_model=DoctorPatientResponse)
async def update_doctor_patient(
    doctor_patient_id: str,
    doctor_patient_data: DoctorPatientUpdate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    updated_doctor_patient = await doctor_patient_service.update_doctor_patient(uuid.UUID(doctor_patient_id), doctor_patient_data, session)
    return updated_doctor_patient


@doctor_patient_router.delete("/{doctor_patient_id}")
async def delete_doctor_patient(
    doctor_patient_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    result = await doctor_patient_service.delete_doctor_patient(uuid.UUID(doctor_patient_id), session)
    return result