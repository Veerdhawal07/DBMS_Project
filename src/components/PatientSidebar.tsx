import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Heart, History, Pill, Calendar, Shield, User, Settings, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const PatientSidebar = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState("Patient");

  useEffect(() => {
    // Get patient data from localStorage
    const patientData = localStorage.getItem('patient_data');
    if (patientData) {
      try {
        const parsedData = JSON.parse(patientData);
        setPatientName(parsedData.full_name);
      } catch (error) {
        console.error("Error parsing patient data:", error);
      }
    }
  }, []);

  const menuItems = [
    { title: "Dashboard", url: "/patient/dashboard", icon: Heart },
    { title: "Medical History", url: "/patient/history", icon: History },
    { title: "Prescriptions", url: "/patient/prescriptions", icon: Pill },
    { title: "Appointments", url: "/patient/appointments", icon: Calendar },
    { title: "Audit Logs", url: "/patient/audit", icon: Shield },
    { title: "Profile", url: "/patient/profile", icon: User },
    { title: "Settings", url: "/patient/settings", icon: Settings },
  ];

  const handleLogout = () => {
    // Clear all patient-related data from localStorage
    localStorage.removeItem('patient_access_token');
    localStorage.removeItem('patient_refresh_token');
    localStorage.removeItem('patient_data');
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-accent" />
            <div>
              <h2 className="font-bold text-lg">MediChain</h2>
              <p className="text-xs text-muted-foreground">Patient Portal</p>
              <p className="text-xs font-medium truncate">{patientName}</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted"
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default PatientSidebar;