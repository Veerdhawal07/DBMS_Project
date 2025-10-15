import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const MedicalHistory = () => {
  const [records] = useState([
    {
      id: 1,
      date: "2024-12-15",
      doctor: "Dr. Sarah Johnson",
      type: "Cardiology Checkup",
      diagnosis: "Regular cardiovascular examination. Blood pressure: 120/80. Heart rate: 72 bpm. ECG normal.",
      notes: "Patient shows excellent cardiovascular health. Continue current exercise routine.",
    },
    {
      id: 2,
      date: "2024-11-20",
      doctor: "Dr. Michael Chen",
      type: "Dermatology Consultation",
      diagnosis: "Mild eczema on forearms. Prescribed topical corticosteroid cream.",
      notes: "Apply cream twice daily. Avoid harsh soaps. Follow up in 2 weeks.",
    },
    {
      id: 3,
      date: "2024-10-05",
      doctor: "Dr. Emily Brown",
      type: "Annual Physical",
      diagnosis: "General health assessment. All vitals within normal range. BMI: 24.5",
      notes: "Patient in good overall health. Recommended annual flu vaccination.",
    },
  ]);

  const handleDownload = (id: number) => {
    toast.success("Medical record downloaded successfully");
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
              <h1 className="text-4xl font-bold mb-2">Medical History</h1>
              <p className="text-muted-foreground">Complete timeline of your medical records</p>
            </div>

            <div className="space-y-4">
              {records.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:border-accent transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl mb-2">{record.type}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(record.date).toLocaleDateString()}
                            </span>
                            <span>{record.doctor}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{record.type}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Date</h4>
                                  <p className="text-muted-foreground">
                                    {new Date(record.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Doctor</h4>
                                  <p className="text-muted-foreground">{record.doctor}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Diagnosis</h4>
                                  <p className="text-muted-foreground">{record.diagnosis}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Notes</h4>
                                  <p className="text-muted-foreground">{record.notes}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(record.id)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{record.diagnosis}</p>
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

export default MedicalHistory;
