# MediChain Healthcare Platform

A comprehensive healthcare management system with separate portals for doctors and patients.

## Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL database
- Git

## Project Structure

```
Main_Project_Folder/
├── app/
│   └── medi_chain_backend/    # FastAPI backend
└── src/                       # React frontend
```

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd app/medi_chain_backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   Create a `.env` file in the `app/medi_chain_backend` directory with your database configuration:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/medi_chain_db
   SECRET_KEY=your_secret_key_here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

6. Run database migrations:
   ```bash
   alembic upgrade head
   ```

### 2. Frontend Setup

1. From the project root directory, install Node dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the Backend Server

1. Navigate to the backend directory:
   ```bash
   cd app/medi_chain_backend
   ```

2. Activate the virtual environment (if not already activated):
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. Start the FastAPI server:
   ```bash
   python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend API will be available at `http://localhost:8000`

### Start the Frontend Development Server

1. From the project root directory:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:8080` (or the next available port)

## Accessing the Application

Once both servers are running:

- **Patient Portal**: `http://localhost:8080/patient`
- **Doctor Portal**: `http://localhost:8080/doctor`

## User Registration and Login

### Patient Registration
1. Navigate to `http://localhost:8080/patient/register`
2. Fill in the registration form with your details
3. Click "Create Account"
4. You'll be redirected to the patient dashboard

### Doctor Registration
1. Navigate to `http://localhost:8080/doctor/register`
2. Fill in the registration form with your details
3. Click "Create Account"
4. You'll be redirected to the doctor dashboard

## Features

### Patient Portal
- Dashboard with health overview
- Medical history tracking
- Appointment scheduling
- Prescription management
- Audit logs
- Profile management

### Doctor Portal
- Dashboard with patient statistics
- Patient management
- Appointment scheduling
- Prescription creation
- Medical records management
- Profile management

## API Documentation

When the backend is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Troubleshooting

### Common Issues

1. **Port already in use**: If you see "Port already in use" errors, the development server will automatically try the next available port.

2. **CORS errors**: Ensure the backend is running and CORS is properly configured.

3. **Database connection errors**: Verify your `.env` file contains the correct database credentials.

4. **Missing dependencies**: Make sure all dependencies are installed in both frontend and backend.

### Need Help?

If you encounter any issues, please check:
1. All setup steps have been completed
2. Both frontend and backend servers are running
3. Environment variables are correctly configured

Running the Project
1. Start the Backend Server
Navigate to the backend directory and start the FastAPI server:
bash
cd app/medi_chain_backend
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
The backend API will be available at http://localhost:8000
From the project root directory, run:
bash
npm run dev
The frontend will be available at http://localhost:8080 (or the next available port)
3. Access the Application
Once both servers are running:
Patient Portal: http://localhost:8080/patient
Doctor Portal: http://localhost:8080/doctor
Both services must be running simultaneously for the full functionality of the application.