from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
import uuid


class DoctorRegister(BaseModel):
    full_name: str = Field(..., max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=6)
    specialization: str = Field(..., max_length=255)
    hospital_name: str = Field(..., max_length=255)
    phone: Optional[str] = Field(default=None, max_length=20)


class DoctorLogin(BaseModel):
    email: EmailStr
    password: str


class DoctorProfile(BaseModel):
    id: uuid.UUID
    full_name: str
    email: EmailStr
    specialization: str
    hospital_name: str
    phone: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class DoctorAuthResponse(BaseModel):
    doctor: DoctorProfile
    access_token: str
    refresh_token: str
    token_type: str = "bearer"