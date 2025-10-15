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
import { Stethoscope, LayoutDashboard, Users, FileText, Pill, Calendar, User, Settings, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DoctorSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Dashboard", url: "/doctor/dashboard", icon: LayoutDashboard },
    { title: "Patients", url: "/doctor/patients", icon: Users },
    { title: "Records", url: "/doctor/records", icon: FileText },
    { title: "Prescriptions", url: "/doctor/prescriptions", icon: Pill },
    { title: "Appointments", url: "/doctor/appointments", icon: Calendar },
    { title: "Profile", url: "/doctor/profile", icon: User },
    { title: "Settings", url: "/doctor/settings", icon: Settings },
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-8 w-8 text-accent" />
            <div>
              <h2 className="font-bold text-lg">MediChain</h2>
              <p className="text-xs text-muted-foreground">Doctor Portal</p>
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

export default DoctorSidebar;
