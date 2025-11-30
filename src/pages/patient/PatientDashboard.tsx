import { motion } from "framer-motion";
import { Activity, Calendar, Pill, FileText, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import PatientSidebar from "@/components/PatientSidebar";
import { useEffect, useState } from "react";
import { patientApi } from "@/lib/api";
import { toast } from "sonner";

const PatientDashboard = () => {
  const [patientName, setPatientName] = useState("Patient");
  const [patientId, setPatientId] = useState("");
  const [stats, setStats] = useState([
    { title: "Upcoming Appointments", value: "0", icon: Calendar, color: "text-accent" },
    { title: "Active Prescriptions", value: "0", icon: Pill, color: "text-green-500" },
    { title: "Medical Records", value: "0", icon: FileText, color: "text-blue-500" },
    { title: "Health Score", value: "0%", icon: TrendingUp, color: "text-purple-500" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get patient data from localStorage
    const patientData = localStorage.getItem('patient_data');
    const accessToken = localStorage.getItem('patient_access_token');
    
    if (patientData && accessToken) {
      try {
        const parsedData = JSON.parse(patientData);
        setPatientId(parsedData.id);
        setPatientName(parsedData.full_name);
        
        // Fetch dynamic data
        fetchDashboardData(accessToken, parsedData.id);
      } catch (error) {
        console.error("Error parsing patient data:", error);
      }
    }
  }, []);

  const fetchDashboardData = async (token: string, id: string) => {
    try {
      setLoading(true);
      
      // Fetch appointments
      const appointmentsResponse = await patientApi.getAppointments(token, id);
      const appointmentsCount = appointmentsResponse ? appointmentsResponse.length : 0;
      
      // Fetch prescriptions
      const prescriptionsResponse = await patientApi.getPrescriptions(token, id);
      const prescriptionsCount = prescriptionsResponse ? prescriptionsResponse.length : 0;
      
      // Fetch medical history
      const medicalHistoryResponse = await patientApi.getMedicalHistory(token, id);
      const medicalRecordsCount = medicalHistoryResponse ? medicalHistoryResponse.length : 0;
      
      // Update stats with fetched data
      setStats([
        { title: "Upcoming Appointments", value: appointmentsCount.toString(), icon: Calendar, color: "text-accent" },
        { title: "Active Prescriptions", value: prescriptionsCount.toString(), icon: Pill, color: "text-green-500" },
        { title: "Medical Records", value: medicalRecordsCount.toString(), icon: FileText, color: "text-blue-500" },
        { title: "Health Score", value: "92%", icon: TrendingUp, color: "text-purple-500" },
      ]);
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const recentActivity = [
    { action: "Lab results uploaded", date: "2 hours ago", type: "report" },
    { action: "Prescription refilled", date: "1 day ago", type: "prescription" },
    { action: "Appointment scheduled", date: "3 days ago", type: "appointment" },
    { action: "Medical record updated", date: "1 week ago", type: "record" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <PatientSidebar />
        <main className="flex-1 p-8 bg-background">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-8"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome Back, {patientName}!</h1>
              <p className="text-muted-foreground">Here's your health overview</p>
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
                      <div className="text-3xl font-bold">
                        {loading ? (
                          <div className="h-8 w-12 bg-gray-200 animate-pulse rounded"></div>
                        ) : (
                          stat.value
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-accent" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest health updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b border-border last:border-0"
                      >
                        <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Next Appointments
                  </CardTitle>
                  <CardDescription>Your upcoming visits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { doctor: "Dr. Sarah Johnson", specialty: "Cardiology", date: "Tomorrow, 10:00 AM" },
                      { doctor: "Dr. Michael Chen", specialty: "Dermatology", date: "Dec 28, 2:30 PM" },
                      { doctor: "Dr. Emily Brown", specialty: "General Medicine", date: "Jan 5, 9:00 AM" },
                    ].map((apt, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between pb-4 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="font-medium">{apt.doctor}</p>
                          <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                        </div>
                        <p className="text-sm font-medium text-accent">{apt.date}</p>
                      </div>
                    ))}
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

export default PatientDashboard;