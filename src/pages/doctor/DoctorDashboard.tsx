import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Pill, Calendar, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState("Dr. Smith");

  useEffect(() => {
    // Get doctor data from localStorage
    const doctorData = localStorage.getItem('doctor_data');
    if (doctorData) {
      try {
        const parsedData = JSON.parse(doctorData);
        setDoctorName(`Dr. ${parsedData.firstname} ${parsedData.lastname}`);
      } catch (error) {
        console.error("Error parsing doctor data:", error);
      }
    }
  }, []);

  const stats = [
    { title: "Total Patients", value: "248", icon: Users, color: "text-accent" },
    { title: "Today's Appointments", value: "12", icon: Calendar, color: "text-green-500" },
    { title: "Pending Records", value: "8", icon: FileText, color: "text-blue-500" },
    { title: "Active Prescriptions", value: "45", icon: Pill, color: "text-purple-500" },
  ];

  const todayAppointments = [
    { time: "09:00 AM", patient: "Alice Johnson", reason: "Follow-up checkup", status: "completed" },
    { time: "10:30 AM", patient: "Bob Smith", reason: "New consultation", status: "in-progress" },
    { time: "02:00 PM", patient: "Carol White", reason: "Lab results review", status: "upcoming" },
    { time: "03:30 PM", patient: "David Brown", reason: "Prescription refill", status: "upcoming" },
  ];

  const handleAddPatient = () => {
    toast.success("Opening new patient form...");
    navigate("/doctor/patients");
  };

  const handleCreateRecord = () => {
    toast.success("Opening record creation form...");
    navigate("/doctor/records");
  };

  const handleWritePrescription = () => {
    toast.success("Opening prescription editor...");
    navigate("/doctor/prescriptions");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DoctorSidebar />
        <main className="flex-1 p-8 bg-background">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Doctor Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {doctorName}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddPatient} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
                <Button onClick={handleCreateRecord} variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Record
                </Button>
                <Button onClick={handleWritePrescription}>
                  <Pill className="h-4 w-4 mr-2" />
                  Write Prescription
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:border-accent transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Today's Appointments
                  </CardTitle>
                  <CardDescription>Your schedule for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((apt, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between pb-4 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="font-medium">{apt.patient}</p>
                          <p className="text-sm text-muted-foreground">{apt.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{apt.time}</p>
                          <p className={`text-xs ${
                            apt.status === "completed" ? "text-green-500" :
                            apt.status === "in-progress" ? "text-accent" :
                            "text-muted-foreground"
                          }`}>
                            {apt.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Frequently used features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => navigate("/doctor/patients")}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      View All Patients
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => navigate("/doctor/records")}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Medical Records
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => navigate("/doctor/prescriptions")}
                    >
                      <Pill className="h-4 w-4 mr-2" />
                      Manage Prescriptions
                    </Button>
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      onClick={() => navigate("/doctor/appointments")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Appointment Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DoctorDashboard;