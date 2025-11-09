import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from src.db.main import get_session
from .schemas import AppointmentCreate, AppointmentUpdate, AppointmentResponse
from .service import AppointmentService
from src.dependencies import AccessTokenBearer

appointment_router = APIRouter()

appointment_service = AppointmentService()
access_token_bearer = AccessTokenBearer()


@appointment_router.post("/", response_model=AppointmentResponse)
async def create_appointment(
    appointment_data: AppointmentCreate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    # Extract actor_id from token
    actor_id = uuid.UUID(token_data["user"]["id"]) if "id" in token_data["user"] else None
    new_appointment = await appointment_service.create_appointment(appointment_data, session, actor_id)
    return new_appointment


@appointment_router.get("/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment(
    appointment_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    appointment = await appointment_service.get_appointment_by_id(uuid.UUID(appointment_id), session)
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Appointment not found"
        )
    return appointment


@appointment_router.get("/patient/{patient_id}", response_model=List[AppointmentResponse])
async def get_appointments_by_patient(
    patient_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    appointments = await appointment_service.get_appointments_by_patient(uuid.UUID(patient_id), session)
    return appointments


@appointment_router.get("/doctor/{doctor_id}", response_model=List[AppointmentResponse])
async def get_appointments_by_doctor(
    doctor_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    appointments = await appointment_service.get_appointments_by_doctor(uuid.UUID(doctor_id), session)
    return appointments


@appointment_router.put("/{appointment_id}", response_model=AppointmentResponse)
async def update_appointment(
    appointment_id: str,
    appointment_data: AppointmentUpdate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    # Extract actor_id from token
    actor_id = uuid.UUID(token_data["user"]["id"]) if "id" in token_data["user"] else None
    updated_appointment = await appointment_service.update_appointment(uuid.UUID(appointment_id), appointment_data, session, actor_id)
    return updated_appointment


@appointment_router.delete("/{appointment_id}")
async def delete_appointment(
    appointment_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    # Extract actor_id from token
    actor_id = uuid.UUID(token_data["user"]["id"]) if "id" in token_data["user"] else None
    result = await appointment_service.delete_appointment(uuid.UUID(appointment_id), session, actor_id)
    return result