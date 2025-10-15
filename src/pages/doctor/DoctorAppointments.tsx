import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Eye, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DoctorAppointments = () => {
  const [appointments] = useState([
    {
      id: 1,
      patient: "Alice Johnson",
      date: "2024-12-24",
      time: "09:00 AM",
      type: "In-person",
      reason: "Follow-up checkup",
      status: "upcoming",
    },
    {
      id: 2,
      patient: "Bob Smith",
      date: "2024-12-24",
      time: "10:30 AM",
      type: "Video Call",
      reason: "New consultation",
      status: "upcoming",
    },
    {
      id: 3,
      patient: "Carol White",
      date: "2024-12-24",
      time: "02:00 PM",
      type: "In-person",
      reason: "Lab results review",
      status: "upcoming",
    },
    {
      id: 4,
      patient: "David Brown",
      date: "2024-12-20",
      time: "11:00 AM",
      type: "In-person",
      reason: "Annual physical",
      status: "completed",
    },
  ]);

  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);

  const handleStartConsultation = (patient: string) => {
    toast.success(`Starting consultation with ${patient}`);
  };

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appointment rescheduled successfully");
    setShowRescheduleDialog(false);
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
            <div>
              <h1 className="text-4xl font-bold mb-2">Appointments</h1>
              <p className="text-muted-foreground">Manage your schedule and consultations</p>
            </div>

            <div className="grid gap-6">
              {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:border-accent transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{appointment.patient}</CardTitle>
                            <Badge
                              variant={
                                appointment.status === "upcoming" ? "default" : "secondary"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{appointment.reason}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </span>
                            <Badge variant="outline">{appointment.type}</Badge>
                          </div>
                        </div>
                        {appointment.status === "upcoming" && (
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Appointment Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-1">Patient</h4>
                                    <p className="text-muted-foreground">{appointment.patient}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Date & Time</h4>
                                    <p className="text-muted-foreground">
                                      {new Date(appointment.date).toLocaleDateString()} at{" "}
                                      {appointment.time}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Type</h4>
                                    <p className="text-muted-foreground">{appointment.type}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Reason</h4>
                                    <p className="text-muted-foreground">{appointment.reason}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowRescheduleDialog(true)}
                            >
                              <Edit2 className="h-4 w-4 mr-2" />
                              Reschedule
                            </Button>
                            {appointment.type === "Video Call" && (
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleStartConsultation(appointment.patient)}
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Start Call
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reschedule Appointment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleReschedule} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-date">New Date</Label>
                    <Input id="new-date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-time">New Time</Label>
                    <Input id="new-time" type="time" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Confirm Reschedule
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DoctorAppointments;
