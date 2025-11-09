from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional
import uuid
from src.patients.models import Patient
from src.doctors.models import Doctor


class Appointment(SQLModel, table=True):
    __tablename__ = "appointments"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    patient_id: uuid.UUID = Field(foreign_key="patients.id", nullable=False)
    doctor_id: uuid.UUID = Field(foreign_key="doctors.id", nullable=False)
    appointment_date: datetime = Field()
    reason: Optional[str] = Field(default=None)
    notes: Optional[str] = Field(default=None)
    status: str = Field(default="scheduled", max_length=50)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    patient: Optional[Patient] = Relationship()
    doctor: Optional[Doctor] = Relationship()

    def __repr__(self):
        return f"<Appointment: {self.id}>"