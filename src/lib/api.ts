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
  console.log('API Response:', response.status, response.statusText);
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      console.log('Error data:', errorData);
      // Extract error message from different possible formats
      if (errorData.detail) {
        errorMessage = typeof errorData.detail === 'string' 
          ? errorData.detail 
          : JSON.stringify(errorData.detail);
      } else if (errorData.message) {
        errorMessage = typeof errorData.message === 'string' 
          ? errorData.message 
          : JSON.stringify(errorData.message);
      } else if (typeof errorData === 'string') {
        errorMessage = errorData;
      } else if (Object.keys(errorData).length > 0) {
        errorMessage = JSON.stringify(errorData);
      }
    } catch (e) {
      // If we can't parse the error, use the status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

// Patient authentication endpoints
export const patientAuthApi = {
  signup: async (data: any) => {
    try {
      console.log('Making signup request to:', `${API_BASE_URL}/patients/signup`);
      console.log('Request data:', data);
      
      const response = await fetch(`${API_BASE_URL}/patients/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      console.log('Signup response:', response.status, response.statusText);
      return handleResponse(response);
    } catch (error: any) {
      console.error('Signup error:', error);
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  login: async (data: any) => {
    try {
      console.log('Making login request to:', `${API_BASE_URL}/patients/login`);
      console.log('Request data:', data);
      
      const response = await fetch(`${API_BASE_URL}/patients/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      console.log('Login response:', response.status, response.statusText);
      return handleResponse(response);
    } catch (error: any) {
      console.error('Login error:', error);
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  refreshToken: async (refreshToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patients/refresh-token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  }
};

// Doctor authentication endpoints
export const doctorAuthApi = {
  signup: async (data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  login: async (data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  refreshToken: async (refreshToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctors/refresh-token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
        },
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  }
};

// Patient dashboard endpoints
export const patientApi = {
  getAppointments: async (token: string, patientId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/patient/${patientId}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  getPrescriptions: async (token: string, patientId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/prescriptions/patient/${patientId}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  getMedicalHistory: async (token: string, patientId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/lab-reports/patient/${patientId}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  getAuditLogs: async (token: string, patientId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/audit-logs/actor/${patientId}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  getDoctors: async (token: string, patientId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctor-patient/patient/${patientId}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  }
};

// Doctor dashboard endpoints
export const doctorApi = {
  getAppointments: async (token: string, doctorId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/doctor/${doctorId}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  getPrescriptions: async (token: string, doctorId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/prescriptions/doctor/${doctorId}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  getPatients: async (token: string, doctorId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctor-patient/doctor/${doctorId}`, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  createPrescription: async (token: string, data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/prescriptions/`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  },
  
  createAppointment: async (token: string, data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error: any) {
      // Provide more specific error information
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Failed to connect to the server. Please check your internet connection and ensure the backend server is running.');
      }
      throw error;
    }
  }
};

// Create a default query client
export const queryClient = new QueryClient();