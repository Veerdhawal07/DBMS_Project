import { QueryClient } from '@tanstack/react-query';

// Create a base API URL - this should match your backend server
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to get auth headers
const getAuthHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Patient authentication endpoints
export const patientAuthApi = {
  signup: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/patients/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
  
  login: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/patients/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
  
  refreshToken: async (refreshToken: string) => {
    const response = await fetch(`${API_BASE_URL}/patients/refresh-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
      },
    });
    return handleResponse(response);
  }
};

// Doctor authentication endpoints
export const doctorAuthApi = {
  signup: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/doctors/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
  
  login: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/doctors/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
  
  refreshToken: async (refreshToken: string) => {
    const response = await fetch(`${API_BASE_URL}/doctors/refresh-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
      },
    });
    return handleResponse(response);
  }
};

// Patient dashboard endpoints
export const patientApi = {
  getAppointments: async (token: string, patientId: string) => {
    const response = await fetch(`${API_BASE_URL}/appointments/patient/${patientId}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
  
  getPrescriptions: async (token: string, patientId: string) => {
    const response = await fetch(`${API_BASE_URL}/prescriptions/patient/${patientId}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
  
  getMedicalHistory: async (token: string, patientId: string) => {
    const response = await fetch(`${API_BASE_URL}/lab-reports/patient/${patientId}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
  
  getAuditLogs: async (token: string, patientId: string) => {
    const response = await fetch(`${API_BASE_URL}/audit-logs/actor/${patientId}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
  
  getDoctors: async (token: string, patientId: string) => {
    const response = await fetch(`${API_BASE_URL}/doctor-patient/patient/${patientId}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  }
};

// Doctor dashboard endpoints
export const doctorApi = {
  getAppointments: async (token: string, doctorId: string) => {
    const response = await fetch(`${API_BASE_URL}/appointments/doctor/${doctorId}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
  
  getPrescriptions: async (token: string, doctorId: string) => {
    const response = await fetch(`${API_BASE_URL}/prescriptions/doctor/${doctorId}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
  
  getPatients: async (token: string, doctorId: string) => {
    const response = await fetch(`${API_BASE_URL}/doctor-patient/doctor/${doctorId}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },
  
  createPrescription: async (token: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/prescriptions/`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
  
  createAppointment: async (token: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/appointments/`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }
};

// Create a default query client
export const queryClient = new QueryClient();