import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Appointments = () => {
  const [appointments] = useState([
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-12-24",
      time: "10:00 AM",
      type: "In-person",
      location: "Medical Center, Room 305",
      status: "upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-12-28",
      time: "2:30 PM",
      type: "Video Call",
      location: "Online Consultation",
      status: "upcoming",
    },
    {
      id: 3,
      doctor: "Dr. Emily Brown",
      specialty: "General Medicine",
      date: "2024-12-15",
      time: "9:00 AM",
      type: "In-person",
      location: "Medical Center, Room 201",
      status: "completed",
    },
  ]);

  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appointment booked successfully!");
    setShowBookingDialog(false);
  };

  const handleStartConsultation = (doctor: string) => {
    toast.success(`Starting video consultation with ${doctor}`);
  };

  const handleReschedule = (id: number) => {
    toast.success("Appointment rescheduled successfully");
  };

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Appointments</h1>
                <p className="text-muted-foreground">Manage your medical appointments</p>
              </div>
              <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book New Appointment</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleBookAppointment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor">Doctor</Label>
                      <Input id="doctor" placeholder="Select doctor" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Input id="reason" placeholder="Brief description" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Confirm Booking
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
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
                            <CardTitle className="text-xl">{appointment.doctor}</CardTitle>
                            <Badge
                              variant={
                                appointment.status === "upcoming" ? "default" : "secondary"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{appointment.specialty}</p>
                        </div>
                        {appointment.status === "upcoming" && (
                          <div className="flex gap-2">
                            {appointment.type === "Video Call" && (
                              <Button
                                variant="default"
                                onClick={() => handleStartConsultation(appointment.doctor)}
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Join Call
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              onClick={() => handleReschedule(appointment.id)}
                            >
                              Reschedule
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Appointments;
