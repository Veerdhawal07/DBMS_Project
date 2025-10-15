import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Lock, Bell, Calendar, Save } from "lucide-react";
import { toast } from "sonner";

const DoctorSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    appointments: true,
    newPatients: true,
    refillRequests: true,
  });

  const [availability, setAvailability] = useState({
    acceptNewPatients: true,
    autoApproveAppointments: false,
    emergencyAvailability: true,
  });

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password changed successfully!");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DoctorSidebar />
        <main className="flex-1 p-8 bg-background">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-accent" />
                  Notifications
                </CardTitle>
                <CardDescription>Configure how you receive updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    id="email-notif"
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, email: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notif">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via text message
                    </p>
                  </div>
                  <Switch
                    id="sms-notif"
                    checked={notifications.sms}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, sms: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="apt-notif">Appointment Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about appointments
                    </p>
                  </div>
                  <Switch
                    id="apt-notif"
                    checked={notifications.appointments}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, appointments: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="patient-notif">New Patient Registrations</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications for new patients
                    </p>
                  </div>
                  <Switch
                    id="patient-notif"
                    checked={notifications.newPatients}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, newPatients: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="refill-notif">Refill Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about prescription refill requests
                    </p>
                  </div>
                  <Switch
                    id="refill-notif"
                    checked={notifications.refillRequests}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, refillRequests: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  Availability Settings
                </CardTitle>
                <CardDescription>Manage your availability preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="accept-patients">Accept New Patients</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new patients to book appointments
                    </p>
                  </div>
                  <Switch
                    id="accept-patients"
                    checked={availability.acceptNewPatients}
                    onCheckedChange={(checked) =>
                      setAvailability({ ...availability, acceptNewPatients: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-approve">Auto-approve Appointments</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve appointment requests
                    </p>
                  </div>
                  <Switch
                    id="auto-approve"
                    checked={availability.autoApproveAppointments}
                    onCheckedChange={(checked) =>
                      setAvailability({ ...availability, autoApproveAppointments: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emergency">Emergency Availability</Label>
                    <p className="text-sm text-muted-foreground">
                      Available for emergency consultations
                    </p>
                  </div>
                  <Switch
                    id="emergency"
                    checked={availability.emergencyAvailability}
                    onCheckedChange={(checked) =>
                      setAvailability({ ...availability, emergencyAvailability: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  Change Password
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button type="submit">Update Password</Button>
                </form>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} size="lg">
                <Save className="h-5 w-5 mr-2" />
                Save All Settings
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DoctorSettings;
