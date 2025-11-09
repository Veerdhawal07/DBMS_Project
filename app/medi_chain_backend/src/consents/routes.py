import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from src.db.main import get_session
from .schemas import ConsentCreate, ConsentUpdate, ConsentResponse
from .service import ConsentService
from src.dependencies import AccessTokenBearer

consent_router = APIRouter()

consent_service = ConsentService()
access_token_bearer = AccessTokenBearer()


@consent_router.post("/", response_model=ConsentResponse)
async def create_consent(
    consent_data: ConsentCreate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    new_consent = await consent_service.create_consent(consent_data, session)
    return new_consent


@consent_router.get("/{consent_id}", response_model=ConsentResponse)
async def get_consent(
    consent_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    consent = await consent_service.get_consent_by_id(uuid.UUID(consent_id), session)
    if not consent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Consent not found"
        )
    return consent


@consent_router.get("/patient/{patient_id}", response_model=List[ConsentResponse])
async def get_consents_by_patient(
    patient_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    consents = await consent_service.get_consents_by_patient(uuid.UUID(patient_id), session)
    return consents


@consent_router.get("/doctor/{doctor_id}", response_model=List[ConsentResponse])
async def get_consents_by_doctor(
    doctor_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    consents = await consent_service.get_consents_by_doctor(uuid.UUID(doctor_id), session)
    return consents


@consent_router.put("/{consent_id}", response_model=ConsentResponse)
async def update_consent(
    consent_id: str,
    consent_data: ConsentUpdate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    updated_consent = await consent_service.update_consent(uuid.UUID(consent_id), consent_data, session)
    return updated_consent


@consent_router.delete("/{consent_id}")
async def delete_consent(
    consent_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    result = await consent_service.delete_consent(uuid.UUID(consent_id), session)
    return result