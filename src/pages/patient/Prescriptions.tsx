import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, Pill, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Prescriptions = () => {
  const [prescriptions] = useState([
    {
      id: 1,
      medication: "Lisinopril 10mg",
      doctor: "Dr. Sarah Johnson",
      date: "2024-12-15",
      duration: "30 days",
      dosage: "1 tablet daily",
      instructions: "Take in the morning with water",
      refillsLeft: 2,
      status: "active",
    },
    {
      id: 2,
      medication: "Metformin 500mg",
      doctor: "Dr. Emily Brown",
      date: "2024-11-20",
      duration: "90 days",
      dosage: "2 tablets daily",
      instructions: "Take with meals, morning and evening",
      refillsLeft: 1,
      status: "active",
    },
    {
      id: 3,
      medication: "Hydrocortisone Cream 1%",
      doctor: "Dr. Michael Chen",
      date: "2024-11-20",
      duration: "14 days",
      dosage: "Apply twice daily",
      instructions: "Apply thin layer to affected areas",
      refillsLeft: 0,
      status: "completed",
    },
  ]);

  const handleRefillRequest = (id: number, medication: string) => {
    toast.success(`Refill request sent for ${medication}`);
  };

  const handleDownload = (medication: string) => {
    toast.success(`${medication} prescription downloaded`);
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
            <div>
              <h1 className="text-4xl font-bold mb-2">Prescriptions</h1>
              <p className="text-muted-foreground">Manage your medications and refills</p>
            </div>

            <div className="grid gap-6">
              {prescriptions.map((prescription, index) => (
                <motion.div
                  key={prescription.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
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
                              <p>Prescribed by {prescription.doctor}</p>
                              <p>Date: {new Date(prescription.date).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-2">
                              <Badge
                                variant={
                                  prescription.status === "active" ? "default" : "secondary"
                                }
                              >
                                {prescription.status}
                              </Badge>
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
                                <DialogTitle>{prescription.medication}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-1">Dosage</h4>
                                  <p className="text-muted-foreground">{prescription.dosage}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">Duration</h4>
                                  <p className="text-muted-foreground">{prescription.duration}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">Instructions</h4>
                                  <p className="text-muted-foreground">
                                    {prescription.instructions}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">Refills Remaining</h4>
                                  <p className="text-muted-foreground">
                                    {prescription.refillsLeft}
                                  </p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(prescription.medication)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <p>{prescription.dosage}</p>
                          <p className="mt-1">{prescription.refillsLeft} refills remaining</p>
                        </div>
                        {prescription.status === "active" && (
                          <Button
                            variant="default"
                            onClick={() =>
                              handleRefillRequest(prescription.id, prescription.medication)
                            }
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Request Refill
                          </Button>
                        )}
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

export default Prescriptions;
