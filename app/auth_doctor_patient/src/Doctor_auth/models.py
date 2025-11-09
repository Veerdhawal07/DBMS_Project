from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid


class Doctor(SQLModel, table=True):
    __tablename__ = "doctor"

    uid: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    firstname: str = Field(nullable=False, max_length=100)
    lastname: str = Field(nullable=False, max_length=100)
    medical_specialty: str = Field(nullable=False, max_length=150)
    medical_license_number: str = Field(nullable=False, unique=True, index=True)
    phoneno: str = Field(nullable=False, max_length=15)
    email: str = Field(nullable=False, unique=True, index=True)
    password_hash: str = Field(nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<Doctor: {self.firstname} {self.lastname}>"
