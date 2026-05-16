import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import OAuthCallback from "./pages/OAuthCallback";
import FacebookCallback from "./pages/FacebookCallback";
import MyGBPs from "./pages/MyGBPs";
import Reviews from "./pages/Reviews";
import Pricing from "./pages/Pricing"; // Public Pricing
import DashboardPricing from "./pages/DashboardPricing"; // Dash Pricing
import Automation from "./pages/Automation";
import ReviewFlow from "./pages/ReviewFlow";
import Activity from "./pages/Activity";
import Analytics from "./pages/Analytics";
import Invoices from "./pages/Invoices";
import HelpCenter from "./pages/HelpCenter";
import ReviewGateway from "./pages/ReviewGateway";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/public/FAQ";
import HowItWorks from "./pages/public/HowItWorks";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Demo from "./pages/public/Demo";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

/**
 * PreloaderGate — refined to remove artificial delays.
 */
const PreloaderGate = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!loading) {
      setShow(false);
    }
  }, [loading]);

  if (show) return <Preloader label="Optimizing workspace..." />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <PreloaderGate>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/free-trial" element={<SignupPage />} />
              <Route path="/login/reset" element={<ResetPassword />} />
              <Route path="/auth" element={<Navigate to="/signup" replace />} />

              {/* Authenticated Dashboard Routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-gbps" element={<MyGBPs />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/automation" element={<Automation />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/review-flow" element={<ReviewFlow />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/dashboard/pricing" element={<DashboardPricing />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />
              </Route>

              {/* Public Review Flow */}
              <Route path="/review/:businessId" element={<ReviewGateway />} />
              <Route path="/oauth/callback" element={<OAuthCallback />} />
              <Route path="/oauth/facebook/callback" element={<FacebookCallback />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PreloaderGate>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
