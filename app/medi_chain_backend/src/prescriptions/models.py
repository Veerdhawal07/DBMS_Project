from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone
from typing import Optional
import uuid
from src.patients.models import Patient
from src.doctors.models import Doctor


class Prescription(SQLModel, table=True):
    __tablename__ = "prescriptions"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    patient_id: uuid.UUID = Field(foreign_key="patients.id", nullable=False)
    doctor_id: uuid.UUID = Field(foreign_key="doctors.id", nullable=False)
    medication: str = Field()  # JSONB in PostgreSQL
    dosage: str = Field()
    instructions: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).replace(tzinfo=None))

    # Relationships
    patient: Optional[Patient] = Relationship()
    doctor: Optional[Doctor] = Relationship()

    def __repr__(self):
        return f"<Prescription: {self.id}>"