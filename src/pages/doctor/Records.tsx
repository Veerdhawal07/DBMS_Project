import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Eye, Download, Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const Records = () => {
  const [records] = useState([
    {
      id: 1,
      patient: "Alice Johnson",
      date: "2024-12-15",
      type: "Cardiology Checkup",
      diagnosis: "Regular cardiovascular examination. Blood pressure: 120/80",
      notes: "Patient shows excellent cardiovascular health",
    },
    {
      id: 2,
      patient: "Bob Smith",
      date: "2024-12-18",
      type: "Diabetes Follow-up",
      diagnosis: "HbA1c: 6.8%. Blood glucose levels improving",
      notes: "Continue current medication. Diet compliance good",
    },
    {
      id: 3,
      patient: "Carol White",
      date: "2024-12-10",
      type: "Asthma Review",
      diagnosis: "Lung function tests normal. No recent attacks",
      notes: "Inhaler technique reviewed. Patient compliant",
    },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Medical record created successfully!");
    setShowAddDialog(false);
  };

  const handleEditRecord = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Record updated successfully!");
    setShowEditDialog(false);
  };

  const handleDownload = (patient: string) => {
    toast.success(`Downloaded record for ${patient}`);
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
                <h1 className="text-4xl font-bold mb-2">Medical Records</h1>
                <p className="text-muted-foreground">Create and manage patient records</p>
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Record
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Medical Record</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddRecord} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient">Patient Name</Label>
                      <Input id="patient" placeholder="Select patient" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="record-type">Record Type</Label>
                      <Input id="record-type" placeholder="e.g., Annual Checkup" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Diagnosis</Label>
                      <Textarea
                        id="diagnosis"
                        placeholder="Enter diagnosis details..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional observations..."
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Record
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
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
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-2">{record.type}</CardTitle>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p>Patient: {record.patient}</p>
                              <p>Date: {new Date(record.date).toLocaleDateString()}</p>
                            </div>
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
                                  <h4 className="font-semibold mb-2">Patient</h4>
                                  <p className="text-muted-foreground">{record.patient}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Date</h4>
                                  <p className="text-muted-foreground">
                                    {new Date(record.date).toLocaleDateString()}
                                  </p>
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
                            onClick={() => {
                              setSelectedRecord(record);
                              setShowEditDialog(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(record.patient)}
                          >
                            <Download className="h-4 w-4" />
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

            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Medical Record</DialogTitle>
                </DialogHeader>
                {selectedRecord && (
                  <form onSubmit={handleEditRecord} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-type">Record Type</Label>
                      <Input
                        id="edit-type"
                        defaultValue={selectedRecord.type}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-diagnosis">Diagnosis</Label>
                      <Textarea
                        id="edit-diagnosis"
                        defaultValue={selectedRecord.diagnosis}
                        rows={4}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-notes">Notes</Label>
                      <Textarea
                        id="edit-notes"
                        defaultValue={selectedRecord.notes}
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Save Changes
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

export default Records;
