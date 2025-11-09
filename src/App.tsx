import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "@/lib/api";

// Landing & Auth Pages
import Landing from "./pages/Landing";
import PatientLogin from "./pages/PatientLogin";
import PatientRegister from "./pages/PatientRegister";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";

// Patient Portal Pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import MedicalHistory from "./pages/patient/MedicalHistory";
import Prescriptions from "./pages/patient/Prescriptions";
import Appointments from "./pages/patient/Appointments";
import AuditLogs from "./pages/patient/AuditLogs";
import Profile from "./pages/patient/Profile";
import Settings from "./pages/patient/Settings";

// Doctor Portal Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Patients from "./pages/doctor/Patients";
import Records from "./pages/doctor/Records";
import DoctorPrescriptions from "./pages/doctor/DoctorPrescriptions";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorSettings from "./pages/doctor/DoctorSettings";

// Protected Route Component
import ProtectedRoute from "./components/ProtectedRoute";

import NotFound from "./pages/NotFound";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing & Auth Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />

          {/* Patient Portal Routes */}
          <Route 
            path="/patient/dashboard" 
            element={
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient/history" 
            element={
              <ProtectedRoute role="patient">
                <MedicalHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient/prescriptions" 
            element={
              <ProtectedRoute role="patient">
                <Prescriptions />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient/appointments" 
            element={
              <ProtectedRoute role="patient">
                <Appointments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient/audit" 
            element={
              <ProtectedRoute role="patient">
                <AuditLogs />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient/profile" 
            element={
              <ProtectedRoute role="patient">
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient/settings" 
            element={
              <ProtectedRoute role="patient">
                <Settings />
              </ProtectedRoute>
            } 
          />

          {/* Doctor Portal Routes */}
          <Route 
            path="/doctor/dashboard" 
            element={
              <ProtectedRoute role="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor/patients" 
            element={
              <ProtectedRoute role="doctor">
                <Patients />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor/records" 
            element={
              <ProtectedRoute role="doctor">
                <Records />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor/prescriptions" 
            element={
              <ProtectedRoute role="doctor">
                <DoctorPrescriptions />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor/appointments" 
            element={
              <ProtectedRoute role="doctor">
                <DoctorAppointments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor/profile" 
            element={
              <ProtectedRoute role="doctor">
                <DoctorProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor/settings" 
            element={
              <ProtectedRoute role="doctor">
                <DoctorSettings />
              </ProtectedRoute>
            } 
          />

          {/* 404 Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;