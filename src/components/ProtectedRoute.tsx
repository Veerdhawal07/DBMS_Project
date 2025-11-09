import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'doctor' | 'patient';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem(`${role}_access_token`);
      const userData = localStorage.getItem(`${role}_data`);
      
      if (!accessToken || !userData) {
        toast.error(`Please log in as ${role} to access this page`);
        navigate(`/${role}/login`);
        return;
      }
      
      try {
        const parsedUserData = JSON.parse(userData);
        if (!parsedUserData.id) {
          throw new Error('Invalid user data');
        }
      } catch (error) {
        toast.error('Session invalid. Please log in again.');
        localStorage.removeItem(`${role}_access_token`);
        localStorage.removeItem(`${role}_refresh_token`);
        localStorage.removeItem(`${role}_data`);
        navigate(`/${role}/login`);
      }
    };

    checkAuth();
  }, [navigate, role]);

  return <>{children}</>;
};

export default ProtectedRoute;