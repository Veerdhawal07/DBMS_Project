import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Building, Save, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { doctorAuthApi } from "@/lib/api";
import { useEffect } from "react";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Dr. Jane Smith",
    email: "jane.smith@hospital.com",
    phone: "+1 (555) 234-5678",
    specialization: "Cardiology",
    licenseNumber: "ML123456",
    hospital: "City Medical Center",
    experience: "15 years",
    education: "MD from Harvard Medical School",
    bio: "Board-certified cardiologist with 15 years of experience in treating cardiovascular diseases.",
  });

  // Initialize form data from localStorage
  useEffect(() => {
    const doctorData = localStorage.getItem('doctor_data');
    if (doctorData) {
      try {
        const parsedData = JSON.parse(doctorData);
        setFormData({
          name: parsedData.full_name || "",
          email: parsedData.email || "",
          phone: parsedData.phone || "",
          specialization: parsedData.specialization || "",
          licenseNumber: parsedData.medical_license_number || "",
          hospital: parsedData.hospital_name || "",
          experience: "15 years",
          education: "MD from Harvard Medical School",
          bio: "Board-certified cardiologist with 15 years of experience in treating cardiovascular diseases.",
        });
      } catch (error) {
        console.error("Error parsing doctor data:", error);
      }
    }
  }, []);

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  // Add delete account function
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.")) {
      try {
        const token = localStorage.getItem('doctor_access_token');
        if (!token) {
          toast.error("Authentication required");
          return;
        }

        const response = await fetch('http://localhost:8000/api/doctors/delete-account', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Clear all doctor-related data from localStorage
          localStorage.removeItem('doctor_access_token');
          localStorage.removeItem('doctor_refresh_token');
          localStorage.removeItem('doctor_data');
          toast.success("Account deleted successfully");
          navigate("/");
        } else {
          const errorData = await response.json();
          toast.error(errorData.detail || "Failed to delete account");
        }
      } catch (error) {
        console.error("Delete account error:", error);
        toast.error("Failed to delete account. Please try again.");
      }
    }
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Profile</h1>
                <p className="text-muted-foreground">Manage your professional information</p>
              </div>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="name"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="hospital"
                        className="pl-10"
                        value={formData.hospital}
                        onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) =>
                        setFormData({ ...formData, specialization: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="license">Medical License Number</Label>
                    <Input
                      id="license"
                      value={formData.licenseNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, licenseNumber: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add Delete Account Section */}
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DoctorProfile;
