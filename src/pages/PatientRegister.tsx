import { motion } from "framer-motion";
import { Heart, Mail, Lock, User, Phone, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { patientAuthApi } from "@/lib/api";

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    // Check only required fields
    const requiredFields = [formData.name, formData.email, formData.phone, formData.password, formData.confirmPassword];
    if (!requiredFields.every((val) => val)) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    try {
      // Prepare data for API call
      // Convert date string to proper format for backend
      let dateOfBirth = null;
      if (formData.dateOfBirth) {
        // Convert YYYY-MM-DD to ISO format, but handle potential errors
        try {
          const dateObj = new Date(formData.dateOfBirth);
          // Ensure it's a valid date
          if (!isNaN(dateObj.getTime())) {
            dateOfBirth = dateObj.toISOString();
          }
        } catch (dateError) {
          console.warn("Invalid date format, sending null", dateError);
          dateOfBirth = null;
        }
      }
      
      const registrationData = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        date_of_birth: dateOfBirth,
        gender: formData.gender || null,
        address: formData.address || null
      };
      
      console.log("Sending registration data:", registrationData);
      
      const response = await patientAuthApi.signup(registrationData);
      
      // Store user data in localStorage
      localStorage.setItem('patient_data', JSON.stringify(response.patient));
      localStorage.setItem('patient_access_token', response.access_token);
      localStorage.setItem('patient_refresh_token', response.refresh_token);
      
      toast.success("Registration successful!");
      navigate("/patient/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      // Better error handling to avoid [object object] error
      let errorMessage = "Registration failed. Please try again.";
      
      // Try to extract more specific error information
      if (error.message) {
        errorMessage = error.message;
      } else if (error.toString() !== '[object Object]') {
        errorMessage = error.toString();
      } else {
        // If it's a network error or CORS issue
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          errorMessage = "Network error: Failed to connect to the server. Please check your internet connection and try again.";
        } else {
          errorMessage = "Registration failed due to a network or server error. Please try again.";
        }
      }
      
      // Log the full error for debugging
      console.error("Full error details:", error);
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/MediChain_logo.png" alt="MediChain Logo" className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Patient Registration</h1>
          <p className="text-muted-foreground">Create your health account</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="patient@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="pl-10"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  className="pl-10"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                className="w-full p-2 border border-border rounded-md bg-background"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="address"
                  placeholder="123 Main St, City, State"
                  className="pl-10"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => navigate("/patient/login")}
              className="text-accent"
            >
              Already have an account? Login
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientRegister;