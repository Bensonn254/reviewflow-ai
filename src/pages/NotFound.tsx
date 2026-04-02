import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { RFLogo } from "@/components/ui/rf-logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#042f2e] to-[#012423] text-[#F0FFF9]">
      <div className="flex items-center justify-center py-28">
        <div className="text-center bg-[#072726] border border-white/10 rounded-2xl p-8">
          <div className="flex justify-center mb-4">
            <RFLogo className="scale-90" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-emerald-100/70">Oops! Page not found</p>
          <Link to="/" className="text-[#06b6a4] underline hover:text-[#0ea5b7]">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
