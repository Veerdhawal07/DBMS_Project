from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import uuid


class LabReportCreate(BaseModel):
    patient_id: uuid.UUID
    doctor_id: Optional[uuid.UUID] = None
    file_url: str
    report_type: str = Field(..., max_length=100)


class LabReportUpdate(BaseModel):
    file_url: Optional[str] = None
    report_type: Optional[str] = Field(default=None, max_length=100)


class LabReportResponse(BaseModel):
    id: uuid.UUID
    patient_id: uuid.UUID
    doctor_id: Optional[uuid.UUID] = None
    file_url: str
    report_type: str
    uploaded_at: datetime

    class Config:
        from_attributes = True