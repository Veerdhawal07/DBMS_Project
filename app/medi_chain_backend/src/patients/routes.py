from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlmodel.ext.asyncio.session import AsyncSession
from datetime import timedelta, datetime
import logging

from src.db.main import get_session
from .schemas import PatientRegister, PatientLogin, PatientAuthResponse, PatientProfile
from .service import PatientService
from src.utils import create_access_token
from src.dependencies import AccessTokenBearer, RefreshTokenBearer

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

patient_router = APIRouter()

patient_service = PatientService()
access_token_bearer = AccessTokenBearer()


@patient_router.post("/signup", response_model=PatientAuthResponse)
async def register_patient(
    patient_data: PatientRegister,
    session: AsyncSession = Depends(get_session),
):
    logger.info(f"Received signup request: {patient_data}")
    try:
        new_patient = await patient_service.register_patient(patient_data, session)
        logger.info(f"Patient registered successfully: {new_patient}")

        # Convert Patient model to PatientProfile schema
        patient_profile = PatientProfile(
            id=new_patient.id,
            full_name=new_patient.full_name,
            email=new_patient.email,
            date_of_birth=new_patient.date_of_birth,
            gender=new_patient.gender,
            address=new_patient.address,
            phone=new_patient.phone,
            created_at=new_patient.created_at
        )

        access_token = create_access_token(
            {"email": new_patient.email, "id": str(new_patient.id)}
        )
        refresh_token = create_access_token(
            {"email": new_patient.email, "id": str(new_patient.id)},
            expiry=timedelta(days=2),
            refresh=True,
        )

        response = PatientAuthResponse(
            patient=patient_profile,
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer"
        )
        logger.info(f"Returning response: {response}")
        return response
    except Exception as e:
        logger.error(f"Error during patient registration: {str(e)}", exc_info=True)
        raise


@patient_router.post("/login", response_model=PatientAuthResponse)
async def login_patient(
    patient_login: PatientLogin,
    session: AsyncSession = Depends(get_session),
):
    patient = await patient_service.authenticate_patient(
        patient_login.email, patient_login.password, session
    )

    # Convert Patient model to PatientProfile schema
    patient_profile = PatientProfile(
        id=patient.id,
        full_name=patient.full_name,
        email=patient.email,
        date_of_birth=patient.date_of_birth,
        gender=patient.gender,
        address=patient.address,
        phone=patient.phone,
        created_at=patient.created_at
    )

    access_token = create_access_token(
        {"email": patient.email, "id": str(patient.id)}
    )
    refresh_token = create_access_token(
        {"email": patient.email, "id": str(patient.id)},
        expiry=timedelta(days=2),
        refresh=True,
    )

    return PatientAuthResponse(
        patient=patient_profile,
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )


@patient_router.get("/refresh-token")
async def refresh_access_token(token_details: dict = Depends(RefreshTokenBearer())):
    expiry_timestamp = token_details["exp"]
    if datetime.fromtimestamp(expiry_timestamp) > datetime.now():
        new_access_token = create_access_token(user_data=token_details["user"])
        return JSONResponse(content={"new_access_token": new_access_token})
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Invalid or expired refresh token",
    )


# Add delete account endpoint
@patient_router.delete("/delete-account")
async def delete_patient_account(
    session: AsyncSession = Depends(get_session),
    token_data: dict = Depends(access_token_bearer)
):
    patient_id = token_data["user"]["id"]
    result = await patient_service.delete_patient(patient_id, session)
    return result