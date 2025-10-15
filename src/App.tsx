import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/history" element={<MedicalHistory />} />
          <Route path="/patient/prescriptions" element={<Prescriptions />} />
          <Route path="/patient/appointments" element={<Appointments />} />
          <Route path="/patient/audit" element={<AuditLogs />} />
          <Route path="/patient/profile" element={<Profile />} />
          <Route path="/patient/settings" element={<Settings />} />

          {/* Doctor Portal Routes */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<Patients />} />
          <Route path="/doctor/records" element={<Records />} />
          <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/doctor/settings" element={<DoctorSettings />} />

          {/* 404 Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
