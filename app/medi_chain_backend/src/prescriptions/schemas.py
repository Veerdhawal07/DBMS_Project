from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import uuid


class PrescriptionCreate(BaseModel):
    patient_id: uuid.UUID
    doctor_id: uuid.UUID
    medication: str  # JSON string
    dosage: str
    instructions: Optional[str] = None


class PrescriptionUpdate(BaseModel):
    medication: Optional[str] = None
    dosage: Optional[str] = None
    instructions: Optional[str] = None


class PrescriptionResponse(BaseModel):
    id: uuid.UUID
    patient_id: uuid.UUID
    doctor_id: uuid.UUID
    medication: str
    dosage: str
    instructions: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True