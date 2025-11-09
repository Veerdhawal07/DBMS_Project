# MediChain Healthcare Platform Backend

This is the backend API for the MediChain Healthcare Platform, built with FastAPI.

## Features

- Patient and Doctor authentication with JWT tokens
- Appointment scheduling
- Prescription management
- Lab report storage
- Consent management
- Audit logging

## Project Structure

```
src/
├── patients/          # Patient authentication and management
├── doctors/           # Doctor authentication and management
├── appointments/      # Appointment scheduling
├── prescriptions/     # Prescription management
├── lab_reports/       # Lab report storage
├── consents/          # Consent management
├── audit_logs/        # Audit logging
├── db/               # Database configuration
├── dependencies.py   # Authentication dependencies
└── utils.py          # Utility functions
```

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables in `.env`:
   ```
   DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/medi_chain_db
   JWT_SECRET=your_jwt_secret_key_here
   JWT_ALGORITHM=HS256
   REDIS_URL=redis://localhost:6379/0
   ```

3. Run database migrations:
   ```bash
   alembic upgrade head
   ```

4. Start the server:
   ```bash
   uvicorn src.main:app --reload
   ```

## API Endpoints

### Authentication
- `POST /api/patients/signup` - Register a new patient
- `POST /api/patients/login` - Login as patient
- `POST /api/doctors/signup` - Register a new doctor
- `POST /api/doctors/login` - Login as doctor
- `GET /api/patients/refresh-token` - Refresh patient access token
- `GET /api/doctors/refresh-token` - Refresh doctor access token

### Appointments
- `POST /api/appointments/` - Create a new appointment
- `GET /api/appointments/{appointment_id}` - Get appointment by ID
- `GET /api/appointments/patient/{patient_id}` - Get appointments by patient
- `GET /api/appointments/doctor/{doctor_id}` - Get appointments by doctor
- `PUT /api/appointments/{appointment_id}` - Update appointment
- `DELETE /api/appointments/{appointment_id}` - Delete appointment

### Prescriptions
- `POST /api/prescriptions/` - Create a new prescription
- `GET /api/prescriptions/{prescription_id}` - Get prescription by ID
- `GET /api/prescriptions/patient/{patient_id}` - Get prescriptions by patient
- `GET /api/prescriptions/doctor/{doctor_id}` - Get prescriptions by doctor
- `PUT /api/prescriptions/{prescription_id}` - Update prescription
- `DELETE /api/prescriptions/{prescription_id}` - Delete prescription

### Lab Reports
- `POST /api/lab-reports/` - Create a new lab report
- `GET /api/lab-reports/{lab_report_id}` - Get lab report by ID
- `GET /api/lab-reports/patient/{patient_id}` - Get lab reports by patient
- `GET /api/lab-reports/doctor/{doctor_id}` - Get lab reports by doctor
- `PUT /api/lab-reports/{lab_report_id}` - Update lab report
- `DELETE /api/lab-reports/{lab_report_id}` - Delete lab report

### Consents
- `POST /api/consents/` - Create a new consent
- `GET /api/consents/{consent_id}` - Get consent by ID
- `GET /api/consents/patient/{patient_id}` - Get consents by patient
- `GET /api/consents/doctor/{doctor_id}` - Get consents by doctor
- `PUT /api/consents/{consent_id}` - Update consent
- `DELETE /api/consents/{consent_id}` - Delete consent

### Audit Logs
- `POST /api/audit-logs/` - Create a new audit log
- `GET /api/audit-logs/{audit_log_id}` - Get audit log by ID
- `GET /api/audit-logs/actor/{actor_id}` - Get audit logs by actor
- `GET /api/audit-logs/action/{action}` - Get audit logs by action
- `DELETE /api/audit-logs/{audit_log_id}` - Delete audit log