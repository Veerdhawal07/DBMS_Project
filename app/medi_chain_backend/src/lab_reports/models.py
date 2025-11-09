from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional
import uuid
from src.patients.models import Patient
from src.doctors.models import Doctor


class LabReport(SQLModel, table=True):
    __tablename__ = "lab_reports"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    patient_id: uuid.UUID = Field(foreign_key="patients.id", nullable=False)
    doctor_id: Optional[uuid.UUID] = Field(default=None, foreign_key="doctors.id")
    file_url: str = Field()
    report_type: str = Field(max_length=100)
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    patient: Optional[Patient] = Relationship()
    doctor: Optional[Doctor] = Relationship()

    def __repr__(self):
        return f"<LabReport: {self.id}>"