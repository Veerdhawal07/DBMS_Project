import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from src.db.main import get_session
from .schemas import LabReportCreate, LabReportUpdate, LabReportResponse
from .service import LabReportService
from src.dependencies import AccessTokenBearer

lab_report_router = APIRouter()

lab_report_service = LabReportService()
access_token_bearer = AccessTokenBearer()


@lab_report_router.post("/", response_model=LabReportResponse)
async def create_lab_report(
    lab_report_data: LabReportCreate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    new_lab_report = await lab_report_service.create_lab_report(lab_report_data, session)
    return new_lab_report


@lab_report_router.get("/{lab_report_id}", response_model=LabReportResponse)
async def get_lab_report(
    lab_report_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    lab_report = await lab_report_service.get_lab_report_by_id(uuid.UUID(lab_report_id), session)
    if not lab_report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Lab report not found"
        )
    return lab_report


@lab_report_router.get("/patient/{patient_id}", response_model=List[LabReportResponse])
async def get_lab_reports_by_patient(
    patient_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    lab_reports = await lab_report_service.get_lab_reports_by_patient(uuid.UUID(patient_id), session)
    return lab_reports


@lab_report_router.get("/doctor/{doctor_id}", response_model=List[LabReportResponse])
async def get_lab_reports_by_doctor(
    doctor_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    lab_reports = await lab_report_service.get_lab_reports_by_doctor(uuid.UUID(doctor_id), session)
    return lab_reports


@lab_report_router.put("/{lab_report_id}", response_model=LabReportResponse)
async def update_lab_report(
    lab_report_id: str,
    lab_report_data: LabReportUpdate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    updated_lab_report = await lab_report_service.update_lab_report(uuid.UUID(lab_report_id), lab_report_data, session)
    return updated_lab_report


@lab_report_router.delete("/{lab_report_id}")
async def delete_lab_report(
    lab_report_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    result = await lab_report_service.delete_lab_report(uuid.UUID(lab_report_id), session)
    return result