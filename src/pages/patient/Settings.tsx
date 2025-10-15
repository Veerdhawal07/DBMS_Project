import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Lock, Bell, Shield, Mail, Save } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    appointments: true,
    prescriptions: true,
    results: true,
  });

  const [privacy, setPrivacy] = useState({
    shareWithDoctors: true,
    anonymousData: false,
    thirdPartyAccess: false,
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
        <PatientSidebar />
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
                    <Label htmlFor="apt-notif">Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded before appointments
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
                    <Label htmlFor="rx-notif">Prescription Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications for prescriptions
                    </p>
                  </div>
                  <Switch
                    id="rx-notif"
                    checked={notifications.prescriptions}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, prescriptions: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control your data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="share-doctors">Share with Doctors</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow approved doctors to access your records
                    </p>
                  </div>
                  <Switch
                    id="share-doctors"
                    checked={privacy.shareWithDoctors}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, shareWithDoctors: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="anonymous">Anonymous Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Help medical research with anonymized data
                    </p>
                  </div>
                  <Switch
                    id="anonymous"
                    checked={privacy.anonymousData}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, anonymousData: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="third-party">Third-party Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow health apps to access your data
                    </p>
                  </div>
                  <Switch
                    id="third-party"
                    checked={privacy.thirdPartyAccess}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, thirdPartyAccess: checked })
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

export default Settings;
