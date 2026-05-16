import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Preloader from "@/components/Preloader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Preloader label="Loading your workspace..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
