from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from .models import Doctor
from src.utils import generate_password_hash, verify_password


class DoctorService:
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
            full_name=doctor_data.full_name,
            email=doctor_data.email,
            password_hash=password_hash,
            specialization=doctor_data.specialization,
            hospital_name=doctor_data.hospital_name,
            phone=doctor_data.phone,
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