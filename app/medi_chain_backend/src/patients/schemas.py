from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
import uuid


class PatientRegister(BaseModel):
    full_name: str = Field(..., max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=6)
    date_of_birth: Optional[datetime] = None
    gender: Optional[str] = Field(default=None, max_length=20)
    address: Optional[str] = None
    phone: Optional[str] = Field(default=None, max_length=20)


class PatientLogin(BaseModel):
    email: EmailStr
    password: str


class PatientProfile(BaseModel):
    id: uuid.UUID
    full_name: str
    email: EmailStr
    date_of_birth: Optional[datetime] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class PatientAuthResponse(BaseModel):
    patient: PatientProfile
    access_token: str
    refresh_token: str
    token_type: str = "bearer"