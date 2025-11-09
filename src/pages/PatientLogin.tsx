import { motion } from "framer-motion";
import { Heart, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { patientAuthApi } from "@/lib/api";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    try {
      const response = await patientAuthApi.login({ email, password });
      
      if (response.access_token) {
        // Store tokens and user data in localStorage
        localStorage.setItem('patient_access_token', response.access_token);
        localStorage.setItem('patient_refresh_token', response.refresh_token);
        localStorage.setItem('patient_data', JSON.stringify(response.patient));
        
        toast.success("Login successful!");
        navigate("/patient/dashboard");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-accent" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Patient Login</h1>
          <p className="text-muted-foreground">Access your health records</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="patient@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Logging in..." : "Login to Portal"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Button
              variant="link"
              onClick={() => navigate("/patient/register")}
              className="text-accent"
            >
              Don't have an account? Register
            </Button>
            <div>
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-muted-foreground"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientLogin;