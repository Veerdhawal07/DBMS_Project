from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import uuid


class ConsentCreate(BaseModel):
    patient_id: uuid.UUID
    doctor_id: uuid.UUID


class ConsentUpdate(BaseModel):
    access_status: Optional[str] = Field(default=None, max_length=50)


class ConsentResponse(BaseModel):
    id: uuid.UUID
    patient_id: uuid.UUID
    doctor_id: uuid.UUID
    access_status: str
    granted_at: Optional[datetime] = None
    revoked_at: Optional[datetime] = None

    class Config:
        from_attributes = True