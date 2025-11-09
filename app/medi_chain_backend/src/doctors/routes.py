from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlmodel.ext.asyncio.session import AsyncSession
from datetime import timedelta, datetime

from src.db.main import get_session
from .schemas import DoctorRegister, DoctorLogin, DoctorAuthResponse, DoctorProfile
from .service import DoctorService
from src.utils import create_access_token
from src.dependencies import AccessTokenBearer, RefreshTokenBearer

doctor_router = APIRouter()

doctor_service = DoctorService()
access_token_bearer = AccessTokenBearer()


@doctor_router.post("/signup", response_model=DoctorAuthResponse)
async def register_doctor(
    doctor_data: DoctorRegister,
    session: AsyncSession = Depends(get_session),
):
    new_doctor = await doctor_service.register_doctor(doctor_data, session)

    # Convert Doctor model to DoctorProfile schema
    doctor_profile = DoctorProfile(
        id=new_doctor.id,
        full_name=new_doctor.full_name,
        email=new_doctor.email,
        specialization=new_doctor.specialization,
        hospital_name=new_doctor.hospital_name,
        phone=new_doctor.phone,
        created_at=new_doctor.created_at
    )

    access_token = create_access_token(
        {"email": new_doctor.email, "id": str(new_doctor.id)}
    )
    refresh_token = create_access_token(
        {"email": new_doctor.email, "id": str(new_doctor.id)},
        expiry=timedelta(days=2),
        refresh=True,
    )

    return DoctorAuthResponse(
        doctor=doctor_profile,
        access_token=access_token,
        refresh_token=refresh_token,
    )


@doctor_router.post("/login", response_model=DoctorAuthResponse)
async def login_doctor(
    doctor_login: DoctorLogin,
    session: AsyncSession = Depends(get_session),
):
    doctor = await doctor_service.authenticate_doctor(
        doctor_login.email, doctor_login.password, session
    )

    # Convert Doctor model to DoctorProfile schema
    doctor_profile = DoctorProfile(
        id=doctor.id,
        full_name=doctor.full_name,
        email=doctor.email,
        specialization=doctor.specialization,
        hospital_name=doctor.hospital_name,
        phone=doctor.phone,
        created_at=doctor.created_at
    )

    access_token = create_access_token(
        {"email": doctor.email, "id": str(doctor.id)}
    )
    refresh_token = create_access_token(
        {"email": doctor.email, "id": str(doctor.id)},
        expiry=timedelta(days=2),
        refresh=True,
    )

    return DoctorAuthResponse(
        doctor=doctor_profile,
        access_token=access_token,
        refresh_token=refresh_token,
    )


@doctor_router.get("/refresh-token")
async def refresh_access_token(token_details: dict = Depends(RefreshTokenBearer())):
    expiry_timestamp = token_details["exp"]
    if datetime.fromtimestamp(expiry_timestamp) > datetime.now():
        new_access_token = create_access_token(user_data=token_details["user"])
        return JSONResponse(content={"new_access_token": new_access_token})
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid or expired refresh token",
    )