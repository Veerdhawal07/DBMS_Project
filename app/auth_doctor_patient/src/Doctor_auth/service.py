from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from .models import Doctor
from .utils import generate_password_hash, verify_password


class DoctorAuthService:
    async def get_doctor_by_email(self, email: str, session: AsyncSession):
        statement = select(Doctor).where(Doctor.email == email)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def doctor_exists(self, email: str, session: AsyncSession):
        doctor = await self.get_doctor_by_email(email, session)
        return doctor is not None

    async def register_doctor(self, doctor_data, session: AsyncSession):
        if await self.doctor_exists(doctor_data.email, session):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Doctor already exists"
            )

        password_hash = generate_password_hash(doctor_data.password)
        new_doctor = Doctor(
            firstname=doctor_data.firstname,
            lastname=doctor_data.lastname,
            medical_specialty=doctor_data.medical_specialty,
            medical_license_number=doctor_data.medical_license_number,
            phoneno=doctor_data.phoneno,
            email=doctor_data.email,
            password_hash=password_hash,
        )
        session.add(new_doctor)
        await session.commit()
        await session.refresh(new_doctor)
        return new_doctor

    async def authenticate_doctor(self, email: str, password: str, session: AsyncSession):
        doctor = await self.get_doctor_by_email(email, session)
        if not doctor or not verify_password(password, doctor.password_hash):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Invalid email or password"
            )
        return doctor
