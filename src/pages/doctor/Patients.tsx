import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Eye, FileText, Calendar, Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Patients = () => {
  const [patients] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      age: 45,
      gender: "Female",
      contact: "+1 (555) 123-4567",
      lastVisit: "2024-12-15",
      condition: "Hypertension",
      status: "active",
    },
    {
      id: 2,
      name: "Bob Smith",
      age: 62,
      gender: "Male",
      contact: "+1 (555) 234-5678",
      lastVisit: "2024-12-18",
      condition: "Diabetes Type 2",
      status: "active",
    },
    {
      id: 3,
      name: "Carol White",
      age: 38,
      gender: "Female",
      contact: "+1 (555) 345-6789",
      lastVisit: "2024-12-10",
      condition: "Asthma",
      status: "active",
    },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Patient added successfully!");
    setShowAddDialog(false);
  };

  const handleViewProfile = (patient: any) => {
    setSelectedPatient(patient);
    setShowProfileDialog(true);
  };

  const handleScheduleAppointment = (patientName: string) => {
    toast.success(`Appointment scheduled with ${patientName}`);
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
                <h1 className="text-4xl font-bold mb-2">Patients</h1>
                <p className="text-muted-foreground">Manage your patient records</p>
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Patient
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddPatient} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-name">Full Name</Label>
                      <Input id="patient-name" placeholder="John Doe" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" type="number" placeholder="45" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Input id="gender" placeholder="Male/Female" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact</Label>
                      <Input id="contact" type="tel" placeholder="+1 (555) 000-0000" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Medical Condition</Label>
                      <Input id="condition" placeholder="Brief description" />
                    </div>
                    <Button type="submit" className="w-full">
                      Add Patient
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search patients..." className="pl-10" />
              </div>
            </div>

            <div className="grid gap-6">
              {patients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:border-accent transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <User className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-2">{patient.name}</CardTitle>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p>
                                {patient.age} years • {patient.gender}
                              </p>
                              <p>{patient.contact}</p>
                              <p>Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-2">
                              <Badge variant="outline">{patient.condition}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProfile(patient)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.success("Opening medical reports...")}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Reports
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleScheduleAppointment(patient.name)}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Patient Profile</DialogTitle>
                </DialogHeader>
                {selectedPatient && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-1">Name</h4>
                        <p className="text-muted-foreground">{selectedPatient.name}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Age</h4>
                        <p className="text-muted-foreground">{selectedPatient.age} years</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Gender</h4>
                        <p className="text-muted-foreground">{selectedPatient.gender}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Contact</h4>
                        <p className="text-muted-foreground">{selectedPatient.contact}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Condition</h4>
                        <p className="text-muted-foreground">{selectedPatient.condition}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Last Visit</h4>
                        <p className="text-muted-foreground">
                          {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Patients;
