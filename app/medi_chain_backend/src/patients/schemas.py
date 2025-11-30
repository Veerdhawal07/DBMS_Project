from pydantic import BaseModel, EmailStr, Field, validator
from datetime import datetime
from typing import Optional
import uuid


class PatientRegister(BaseModel):
    full_name: str = Field(..., max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=6)
    date_of_birth: Optional[str] = None
    gender: Optional[str] = Field(default=None, max_length=20)
    address: Optional[str] = None
    phone: Optional[str] = Field(default=None, max_length=20)
    
    # Validator to convert string to datetime if provided
    @validator('date_of_birth')
    def parse_date_of_birth(cls, v):
        if v is None:
            return None
        try:
            # Handle different date formats
            if isinstance(v, str):
                # Try to parse as ISO format first
                try:
                    return datetime.fromisoformat(v.replace('Z', '+00:00'))
                except ValueError:
                    # Try to parse as YYYY-MM-DD
                    try:
                        return datetime.strptime(v, '%Y-%m-%d')
                    except ValueError:
                        # If all parsing fails, return None
                        return None
            return v
        except Exception:
            # If any exception occurs, return None
            return None


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