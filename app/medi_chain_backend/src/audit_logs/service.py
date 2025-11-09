import uuid
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from .models import AuditLog
from .schemas import AuditLogCreate
from typing import List


class AuditLogService:
    async def get_audit_log_by_id(self, audit_log_id: uuid.UUID, session: AsyncSession):
        statement = select(AuditLog).where(AuditLog.id == audit_log_id)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def get_audit_logs_by_actor(self, actor_id: uuid.UUID, session: AsyncSession) -> List[AuditLog]:
        statement = select(AuditLog).where(AuditLog.actor_id == actor_id)
        result = await session.execute(statement)
        audit_logs = result.scalars().all()
        return list(audit_logs)

    async def get_audit_logs_by_action(self, action: str, session: AsyncSession) -> List[AuditLog]:
        statement = select(AuditLog).where(AuditLog.action == action)
        result = await session.execute(statement)
        audit_logs = result.scalars().all()
        return list(audit_logs)

    async def create_audit_log(self, audit_log_data: AuditLogCreate, session: AsyncSession):
        new_audit_log = AuditLog(
            actor_id=audit_log_data.actor_id,
            action=audit_log_data.action,
            target_type=audit_log_data.target_type,
            target_id=audit_log_data.target_id,
            ip_address=audit_log_data.ip_address,
        )
        session.add(new_audit_log)
        await session.commit()
        await session.refresh(new_audit_log)
        return new_audit_log

    async def delete_audit_log(self, audit_log_id: uuid.UUID, session: AsyncSession):
        audit_log = await self.get_audit_log_by_id(audit_log_id, session)
        if not audit_log:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Audit log not found"
            )

        await session.delete(audit_log)
        await session.commit()
        return {"message": "Audit log deleted successfully"}