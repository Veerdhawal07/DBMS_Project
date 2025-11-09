import uuid
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from .models import LabReport
from .schemas import LabReportCreate, LabReportUpdate
from src.patients.models import Patient
from src.doctors.models import Doctor
from typing import List


class LabReportService:
    async def get_lab_report_by_id(self, lab_report_id: uuid.UUID, session: AsyncSession):
        statement = select(LabReport).where(LabReport.id == lab_report_id)
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def get_lab_reports_by_patient(self, patient_id: uuid.UUID, session: AsyncSession) -> List[LabReport]:
        statement = select(LabReport).where(LabReport.patient_id == patient_id)
        result = await session.execute(statement)
        lab_reports = result.scalars().all()
        return list(lab_reports)

    async def get_lab_reports_by_doctor(self, doctor_id: uuid.UUID, session: AsyncSession) -> List[LabReport]:
        statement = select(LabReport).where(LabReport.doctor_id == doctor_id)
        result = await session.execute(statement)
        lab_reports = result.scalars().all()
        return list(lab_reports)

    async def create_lab_report(self, lab_report_data: LabReportCreate, session: AsyncSession):
        # Check if patient exists
        patient_statement = select(Patient).where(Patient.id == lab_report_data.patient_id)
        patient_result = await session.execute(patient_statement)
        patient = patient_result.scalar_one_or_none()
        
        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found"
            )

        # Check if doctor exists (if provided)
        doctor = None
        if lab_report_data.doctor_id:
            doctor_statement = select(Doctor).where(Doctor.id == lab_report_data.doctor_id)
            doctor_result = await session.execute(doctor_statement)
            doctor = doctor_result.scalar_one_or_none()
            
            if not doctor:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Doctor not found"
                )

        new_lab_report = LabReport(
            patient_id=lab_report_data.patient_id,
            doctor_id=lab_report_data.doctor_id,
            file_url=lab_report_data.file_url,
            report_type=lab_report_data.report_type,
        )
        session.add(new_lab_report)
        await session.commit()
        await session.refresh(new_lab_report)
        return new_lab_report

    async def update_lab_report(self, lab_report_id: uuid.UUID, lab_report_data: LabReportUpdate, session: AsyncSession):
        lab_report = await self.get_lab_report_by_id(lab_report_id, session)
        if not lab_report:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Lab report not found"
            )

        # Update only provided fields
        if lab_report_data.file_url is not None:
            lab_report.file_url = lab_report_data.file_url
        if lab_report_data.report_type is not None:
            lab_report.report_type = lab_report_data.report_type

        session.add(lab_report)
        await session.commit()
        await session.refresh(lab_report)
        return lab_report

    async def delete_lab_report(self, lab_report_id: uuid.UUID, session: AsyncSession):
        lab_report = await self.get_lab_report_by_id(lab_report_id, session)
        if not lab_report:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Lab report not found"
            )

        await session.delete(lab_report)
        await session.commit()
        return {"message": "Lab report deleted successfully"}