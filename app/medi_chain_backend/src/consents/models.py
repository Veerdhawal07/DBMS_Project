from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional
import uuid
from src.patients.models import Patient
from src.doctors.models import Doctor


class Consent(SQLModel, table=True):
    __tablename__ = "consents"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    patient_id: uuid.UUID = Field(foreign_key="patients.id", nullable=False)
    doctor_id: uuid.UUID = Field(foreign_key="doctors.id", nullable=False)
    access_status: str = Field(default="pending", max_length=50)
    granted_at: Optional[datetime] = Field(default=None)
    revoked_at: Optional[datetime] = Field(default=None)

    patient: Optional[Patient] = Relationship()
    doctor: Optional[Doctor] = Relationship()

    def __repr__(self):
        return f"<Consent: {self.id}>"