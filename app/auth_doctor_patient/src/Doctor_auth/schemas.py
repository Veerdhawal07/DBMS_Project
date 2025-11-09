from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional
import uuid


class DoctorRegister(BaseModel):
    firstname: str
    lastname: str
    medical_specialty: str
    medical_license_number: str
    phoneno: str
    email: EmailStr
    password: str = Field(..., min_length=6)


class DoctorLogin(BaseModel):
    email: EmailStr
    password: str


class DoctorProfile(BaseModel):
    uid: uuid.UUID
    firstname: str
    lastname: str
    email: EmailStr
    medical_specialty: str
    phoneno: str
    created_at: datetime

    class Config:
        from_attributes = True


class DoctorAuthResponse(BaseModel):
    doctor: DoctorProfile
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
