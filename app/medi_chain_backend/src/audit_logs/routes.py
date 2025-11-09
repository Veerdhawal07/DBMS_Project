import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List

from src.db.main import get_session
from .schemas import AuditLogCreate, AuditLogResponse
from .service import AuditLogService
from src.dependencies import AccessTokenBearer

audit_log_router = APIRouter()

audit_log_service = AuditLogService()
access_token_bearer = AccessTokenBearer()


@audit_log_router.post("/", response_model=AuditLogResponse)
async def create_audit_log(
    audit_log_data: AuditLogCreate,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    new_audit_log = await audit_log_service.create_audit_log(audit_log_data, session)
    return new_audit_log


@audit_log_router.get("/{audit_log_id}", response_model=AuditLogResponse)
async def get_audit_log(
    audit_log_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    audit_log = await audit_log_service.get_audit_log_by_id(uuid.UUID(audit_log_id), session)
    if not audit_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Audit log not found"
        )
    return audit_log


@audit_log_router.get("/actor/{actor_id}", response_model=List[AuditLogResponse])
async def get_audit_logs_by_actor(
    actor_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    audit_logs = await audit_log_service.get_audit_logs_by_actor(uuid.UUID(actor_id), session)
    return audit_logs


@audit_log_router.get("/action/{action}", response_model=List[AuditLogResponse])
async def get_audit_logs_by_action(
    action: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    audit_logs = await audit_log_service.get_audit_logs_by_action(action, session)
    return audit_logs


@audit_log_router.delete("/{audit_log_id}")
async def delete_audit_log(
    audit_log_id: str,
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    result = await audit_log_service.delete_audit_log(uuid.UUID(audit_log_id), session)
    return result