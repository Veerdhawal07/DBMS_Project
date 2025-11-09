from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import uuid


class DoctorPatientCreate(BaseModel):
    doctor_id: uuid.UUID
    patient_id: uuid.UUID
    relationship_type: Optional[str] = Field(default="primary_care", max_length=50)


class DoctorPatientUpdate(BaseModel):
    relationship_type: Optional[str] = Field(default=None, max_length=50)
    is_active: Optional[bool] = None


class DoctorPatientResponse(BaseModel):
    id: uuid.UUID
    doctor_id: uuid.UUID
    patient_id: uuid.UUID
    assigned_at: datetime
    relationship_type: str
    is_active: bool

    class Config:
        from_attributes = True