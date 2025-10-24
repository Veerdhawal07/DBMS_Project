import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pill, Eye, Edit, CheckCircle, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DoctorPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patient: "Alice Johnson",
      medication: "Lisinopril 10mg",
      dosage: "1 tablet daily",
      duration: "30 days",
      date: "2024-12-15",
      status: "active",
      refillRequest: false,
    },
    {
      id: 2,
      patient: "Bob Smith",
      medication: "Metformin 500mg",
      dosage: "2 tablets daily",
      duration: "90 days",
      date: "2024-12-10",
      status: "active",
      refillRequest: true,
    },
    {
      id: 3,
      patient: "Carol White",
      medication: "Albuterol Inhaler",
      dosage: "2 puffs as needed",
      duration: "90 days",
      date: "2024-12-05",
      status: "active",
      refillRequest: false,
    },
  ]);

  const [showWriteDialog, setShowWriteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleWritePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const newPrescription = {
      id: prescriptions.length + 1,
      patient: formData.get("patient-select") as string,
      medication: formData.get("medication") as string,
      dosage: formData.get("dosage") as string,
      duration: formData.get("duration") as string,
      date: new Date().toISOString().split('T')[0],
      status: "active",
      refillRequest: false,
    };
    
    setTimeout(() => {
      setPrescriptions(prev => [...prev, newPrescription]);
      toast.success("Prescription created successfully!");
      setIsLoading(false);
      setShowWriteDialog(false);
    }, 2000);
  };

  const handleEditPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    
    setTimeout(() => {
      if (selectedPrescription) {
        setPrescriptions(prev => prev.map(presc => 
          presc.id === selectedPrescription.id 
            ? {
                ...presc,
                medication: formData.get("edit-medication") as string,
                dosage: formData.get("edit-dosage") as string,
                duration: formData.get("edit-duration") as string,
              }
            : presc
        ));
        toast.success("Prescription updated successfully!");
      }
      setIsLoading(false);
      setShowEditDialog(false);
    }, 2000);
  };

  const handleApproveRefill = (id: number, patient: string, medication: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setPrescriptions(prev => prev.map(presc => 
        presc.id === id ? { ...presc, refillRequest: false } : presc
      ));
      toast.success(`Refill approved for ${patient} - ${medication}`);
      setIsLoading(false);
    }, 2000);
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
                <h1 className="text-4xl font-bold mb-2">Prescriptions</h1>
                <p className="text-muted-foreground">Manage patient medications</p>
              </div>
              <Dialog open={showWriteDialog} onOpenChange={setShowWriteDialog}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Write Prescription
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Write New Prescription</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleWritePrescription} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-select">Patient</Label>
                      <Input id="patient-select" name="patient-select" placeholder="Select patient" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medication">Medication</Label>
                      <Input id="medication" name="medication" placeholder="e.g., Amoxicillin 500mg" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input id="dosage" name="dosage" placeholder="e.g., 1 tablet daily" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" name="duration" placeholder="e.g., 30 days" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        name="instructions"
                        placeholder="Additional instructions for patient..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="refills">Number of Refills</Label>
                      <Input id="refills" name="refills" type="number" defaultValue="0" min="0" max="12" />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Prescription..." : "Create Prescription"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {prescriptions.map((prescription, index) => (
                <motion.div
                  key={prescription.id}
                  initial={{ opacity: 0, scale: 0.95, height: 0 }}
                  animate={{ opacity: 1, scale: 1, height: "auto" }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <Card className="hover:border-accent transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Pill className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-2">
                              {prescription.medication}
                            </CardTitle>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p>Patient: {prescription.patient}</p>
                              <p>Date: {new Date(prescription.date).toLocaleDateString()}</p>
                              <p>Dosage: {prescription.dosage}</p>
                            </div>
                            <div className="mt-2 flex gap-2">
                              <Badge variant="outline">{prescription.status}</Badge>
                              {prescription.refillRequest && (
                                <Badge variant="default">Refill Requested</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Prescription Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-1">Patient</h4>
                                  <p className="text-muted-foreground">{prescription.patient}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">Medication</h4>
                                  <p className="text-muted-foreground">{prescription.medication}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">Dosage</h4>
                                  <p className="text-muted-foreground">{prescription.dosage}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">Duration</h4>
                                  <p className="text-muted-foreground">{prescription.duration}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedPrescription(prescription);
                              setShowEditDialog(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          {prescription.refillRequest && (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() =>
                                handleApproveRefill(
                                  prescription.id,
                                  prescription.patient,
                                  prescription.medication
                                )
                              }
                              disabled={isLoading}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              {isLoading ? "Approving..." : "Approve Refill"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Duration: {prescription.duration}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Prescription</DialogTitle>
                </DialogHeader>
                {selectedPrescription && (
                  <form onSubmit={handleEditPrescription} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-medication">Medication</Label>
                      <Input
                        id="edit-medication"
                        name="edit-medication"
                        defaultValue={selectedPrescription.medication}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-dosage">Dosage</Label>
                        <Input
                          id="edit-dosage"
                          name="edit-dosage"
                          defaultValue={selectedPrescription.dosage}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-duration">Duration</Label>
                        <Input
                          id="edit-duration"
                          name="edit-duration"
                          defaultValue={selectedPrescription.duration}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DoctorPrescriptions;
