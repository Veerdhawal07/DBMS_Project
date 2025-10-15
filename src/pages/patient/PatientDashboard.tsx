import { motion } from "framer-motion";
import { Activity, Calendar, Pill, FileText, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider } from "@/components/ui/sidebar";
import PatientSidebar from "@/components/PatientSidebar";

const PatientDashboard = () => {
  const stats = [
    { title: "Upcoming Appointments", value: "3", icon: Calendar, color: "text-accent" },
    { title: "Active Prescriptions", value: "5", icon: Pill, color: "text-green-500" },
    { title: "Medical Records", value: "12", icon: FileText, color: "text-blue-500" },
    { title: "Health Score", value: "92%", icon: TrendingUp, color: "text-purple-500" },
  ];

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
              <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
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
