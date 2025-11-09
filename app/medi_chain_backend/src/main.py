from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.db.main import init_db
from src.patients.routes import patient_router
from src.doctors.routes import doctor_router
from src.appointments.routes import appointment_router
from src.prescriptions.routes import prescription_router
from src.lab_reports.routes import lab_report_router
from src.consents.routes import consent_router
from src.audit_logs.routes import audit_log_router
from src.doctor_patient.routes import doctor_patient_router


app = FastAPI(title="MediChain Healthcare Platform", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:8081", "http://localhost:8082", "http://127.0.0.1:8080", "http://127.0.0.1:8081", "http://127.0.0.1:8082"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
@app.on_event("startup")
async def on_startup():
    await init_db()


# Include routers
app.include_router(patient_router, prefix="/api/patients", tags=["patients"])
app.include_router(doctor_router, prefix="/api/doctors", tags=["doctors"])
app.include_router(appointment_router, prefix="/api/appointments", tags=["appointments"])
app.include_router(prescription_router, prefix="/api/prescriptions", tags=["prescriptions"])
app.include_router(lab_report_router, prefix="/api/lab-reports", tags=["lab-reports"])
app.include_router(consent_router, prefix="/api/consents", tags=["consents"])
app.include_router(audit_log_router, prefix="/api/audit-logs", tags=["audit-logs"])
app.include_router(doctor_patient_router, prefix="/api/doctor-patient", tags=["doctor-patient"])


@app.get("/")
async def root():
    return {"message": "Welcome to MediChain Healthcare Platform API"}