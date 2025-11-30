from sqlmodel import SQLModel, Field
from datetime import datetime, timezone
from typing import Optional
import uuid


class Patient(SQLModel, table=True):
    __tablename__ = "patients"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    full_name: str = Field(max_length=255)
    email: str = Field(unique=True, index=True, max_length=255)
    password_hash: str = Field()
    date_of_birth: Optional[datetime] = Field(default=None)
    gender: Optional[str] = Field(default=None, max_length=20)
    address: Optional[str] = Field(default=None)
    phone: Optional[str] = Field(default=None, max_length=20)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc).replace(tzinfo=None))

    def __repr__(self):
        return f"<Patient: {self.full_name}>"