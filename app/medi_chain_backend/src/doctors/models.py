from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional
import uuid


class Doctor(SQLModel, table=True):
    __tablename__ = "doctors"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    full_name: str = Field(max_length=255)
    email: str = Field(unique=True, index=True, max_length=255)
    password_hash: str = Field()
    specialization: str = Field(max_length=255)
    hospital_name: str = Field(max_length=255)
    phone: Optional[str] = Field(default=None, max_length=20)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    def __repr__(self):
        return f"<Doctor: {self.full_name}>"