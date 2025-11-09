from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlmodel.ext.asyncio.session import AsyncSession
from datetime import timedelta, datetime

from src.db.main import get_session
from .schemas import DoctorRegister, DoctorLogin, DoctorAuthResponse
from .service import DoctorAuthService
from .utils import create_access_token
from .dependencies import AccessTokenBearer, RefreshTokenBearer

auth_router = APIRouter()

doctor_service = DoctorAuthService()
access_token_bearer = AccessTokenBearer()


@auth_router.post("/signup", response_model=DoctorAuthResponse)
async def register_doctor(
    doctor_data: DoctorRegister,
    session: AsyncSession = Depends(get_session),
):
    new_doctor = await doctor_service.register_doctor(doctor_data, session)

    access_token = create_access_token(
        {"email": new_doctor.email, "uid": str(new_doctor.uid)}
    )
    refresh_token = create_access_token(
        {"email": new_doctor.email, "uid": str(new_doctor.uid)},
        expiry=timedelta(days=2),
        refresh=True,
    )

    return DoctorAuthResponse(
        doctor=new_doctor,
        access_token=access_token,
        refresh_token=refresh_token,
    )


@auth_router.post("/login", response_model=DoctorAuthResponse)
async def login_doctor(
    doctor_login: DoctorLogin,
    session: AsyncSession = Depends(get_session),
):
    doctor = await doctor_service.authenticate_doctor(
        doctor_login.email, doctor_login.password, session
    )

    access_token = create_access_token(
        {"email": doctor.email, "uid": str(doctor.uid)}
    )
    refresh_token = create_access_token(
        {"email": doctor.email, "uid": str(doctor.uid)},
        expiry=timedelta(days=2),
        refresh=True,
    )

    return DoctorAuthResponse(
        doctor=doctor,
        access_token=access_token,
        refresh_token=refresh_token,
    )


@auth_router.get("/refresh-token")
async def refresh_access_token(token_details: dict = Depends(RefreshTokenBearer())):
    expiry_timestamp = token_details["exp"]
    if datetime.fromtimestamp(expiry_timestamp) > datetime.now():
        new_access_token = create_access_token(user_data=token_details["user"])
        return JSONResponse(content={"new_access_token": new_access_token})
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid or expired refresh token",
    )
