import { motion } from "framer-motion";
import { Heart, Shield, Clock, Activity, Users, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is encrypted and protected with blockchain technology",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Access your medical records anytime, anywhere from any device",
    },
    {
      icon: Activity,
      title: "Real-time Updates",
      description: "Get instant notifications for prescriptions, appointments, and results",
    },
    {
      icon: Users,
      title: "Connected Care",
      description: "Seamless communication between patients and healthcare providers",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <img src="MediChain_logo.png" alt="" className="h-12 w-12" />
            <span className="text-2xl font-bold">MediChain</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
          >
            <Button variant="ghost" onClick={() => navigate("/patient/login")}>
              Patient Login
            </Button>
            <Button variant="default" onClick={() => navigate("/doctor/login")}>
              Doctor Login
            </Button>
          </motion.div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Your Health History,
              <br />
              <span className="text-accent">Anywhere. Anytime.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Secure, blockchain-powered healthcare platform connecting patients and doctors
              for better care coordination.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="text-lg"
              onClick={() => navigate("/patient/register")}
            >
              Get Started as Patient
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg"
              onClick={() => navigate("/doctor/register")}
            >
              Join as Doctor
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 border-t border-border">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Healthcare Platform Built for Trust
          </h2>
          <p className="text-muted-foreground text-lg">
            Experience modern healthcare management with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6 hover:border-accent transition-colors"
            >
              <feature.icon className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-accent text-accent-foreground rounded-2xl p-12 md:p-16 text-center"
        >
          <FileText className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of patients and doctors already using MediChain for secure,
            efficient healthcare management.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg"
            onClick={() => navigate("/patient/register")}
          >
            Create Your Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 MediChain. Secure Healthcare Platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
