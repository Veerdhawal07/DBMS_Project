from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional
import uuid
from src.patients.models import Patient
from src.doctors.models import Doctor


class DoctorPatient(SQLModel, table=True):
    __tablename__ = "doctor_patient"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    doctor_id: uuid.UUID = Field(foreign_key="doctors.id", nullable=False)
    patient_id: uuid.UUID = Field(foreign_key="patients.id", nullable=False)
    assigned_at: datetime = Field(default_factory=datetime.utcnow)
    relationship_type: Optional[str] = Field(default="primary_care", max_length=50)  # primary_care, specialist, consultant
    is_active: bool = Field(default=True)
    
    # Relationships
    doctor: Optional[Doctor] = Relationship()
    patient: Optional[Patient] = Relationship()

    def __repr__(self):
        return f"<DoctorPatient: Doctor {self.doctor_id} - Patient {self.patient_id}>"