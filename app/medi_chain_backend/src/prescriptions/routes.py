import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from src.db.main import get_session
from .schemas import PrescriptionCreate, PrescriptionUpdate, PrescriptionResponse
from .service import PrescriptionService
from src.dependencies import AccessTokenBearer

prescription_router = APIRouter()

prescription_service = PrescriptionService()
access_token_bearer = AccessTokenBearer()


@prescription_router.post("/", response_model=PrescriptionResponse)
async def create_prescription(
    prescription_data: PrescriptionCreate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    # Extract actor_id from token
    actor_id = uuid.UUID(token_data["user"]["id"]) if "id" in token_data["user"] else None
    new_prescription = await prescription_service.create_prescription(prescription_data, session, actor_id)
    return new_prescription


@prescription_router.get("/{prescription_id}", response_model=PrescriptionResponse)
async def get_prescription(
    prescription_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    prescription = await prescription_service.get_prescription_by_id(uuid.UUID(prescription_id), session)
    if not prescription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Prescription not found"
        )
    return prescription


@prescription_router.get("/patient/{patient_id}", response_model=List[PrescriptionResponse])
async def get_prescriptions_by_patient(
    patient_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    prescriptions = await prescription_service.get_prescriptions_by_patient(uuid.UUID(patient_id), session)
    return prescriptions


@prescription_router.get("/doctor/{doctor_id}", response_model=List[PrescriptionResponse])
async def get_prescriptions_by_doctor(
    doctor_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    prescriptions = await prescription_service.get_prescriptions_by_doctor(uuid.UUID(doctor_id), session)
    return prescriptions


@prescription_router.put("/{prescription_id}", response_model=PrescriptionResponse)
async def update_prescription(
    prescription_id: str,
    prescription_data: PrescriptionUpdate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    # Extract actor_id from token
    actor_id = uuid.UUID(token_data["user"]["id"]) if "id" in token_data["user"] else None
    updated_prescription = await prescription_service.update_prescription(uuid.UUID(prescription_id), prescription_data, session, actor_id)
    return updated_prescription


@prescription_router.delete("/{prescription_id}")
async def delete_prescription(
    prescription_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    # Extract actor_id from token
    actor_id = uuid.UUID(token_data["user"]["id"]) if "id" in token_data["user"] else None
    result = await prescription_service.delete_prescription(uuid.UUID(prescription_id), session, actor_id)
    return result