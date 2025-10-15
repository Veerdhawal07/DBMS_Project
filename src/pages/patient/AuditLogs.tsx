import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Download, FileText, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AuditLogs = () => {
  const logs = [
    {
      id: 1,
      action: "Medical record accessed",
      actor: "Dr. Sarah Johnson",
      timestamp: "2024-12-20 10:45:23",
      type: "access",
      details: "Viewed cardiology checkup report",
      status: "approved",
    },
    {
      id: 2,
      action: "Prescription created",
      actor: "Dr. Emily Brown",
      timestamp: "2024-12-15 14:30:10",
      type: "create",
      details: "Created prescription for Metformin 500mg",
      status: "approved",
    },
    {
      id: 3,
      action: "Lab results uploaded",
      actor: "Central Lab Services",
      timestamp: "2024-12-10 09:15:45",
      type: "upload",
      details: "Blood test results - Complete Blood Count",
      status: "approved",
    },
    {
      id: 4,
      action: "Record download",
      actor: "You",
      timestamp: "2024-12-08 16:20:33",
      type: "download",
      details: "Downloaded annual physical examination report",
      status: "approved",
    },
    {
      id: 5,
      action: "Access request",
      actor: "Dr. Michael Chen",
      timestamp: "2024-12-05 11:30:00",
      type: "request",
      details: "Requested access to dermatology consultation history",
      status: "approved",
    },
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case "access":
        return Eye;
      case "download":
        return Download;
      case "upload":
        return FileText;
      default:
        return CheckCircle;
    }
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
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10 text-accent" />
              <div>
                <h1 className="text-4xl font-bold mb-2">Audit Logs</h1>
                <p className="text-muted-foreground">
                  Blockchain-powered access tracking for your medical records
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {logs.map((log, index) => {
                    const Icon = getActionIcon(log.type);
                    return (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-4 pb-4 border-b border-border last:border-0"
                      >
                        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="font-medium">{log.action}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {log.details}
                              </p>
                            </div>
                            <Badge variant="outline" className="flex-shrink-0">
                              {log.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="font-medium">{log.actor}</span>
                            <span>•</span>
                            <span>{log.timestamp}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Blockchain Security</h3>
                    <p className="text-sm text-muted-foreground">
                      All access to your medical records is logged on the blockchain, creating an
                      immutable audit trail. You have complete visibility into who accessed your
                      data, when, and for what purpose.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AuditLogs;
