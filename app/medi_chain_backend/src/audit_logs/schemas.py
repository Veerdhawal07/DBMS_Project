from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import uuid


class AuditLogCreate(BaseModel):
    actor_id: uuid.UUID
    action: str = Field(..., max_length=100)
    target_type: str = Field(..., max_length=50)
    target_id: Optional[uuid.UUID] = None
    ip_address: Optional[str] = Field(default=None, max_length=100)


class AuditLogResponse(BaseModel):
    id: uuid.UUID
    actor_id: uuid.UUID
    action: str
    target_type: str
    target_id: Optional[uuid.UUID] = None
    timestamp: datetime
    ip_address: Optional[str] = None

    class Config:
        from_attributes = True