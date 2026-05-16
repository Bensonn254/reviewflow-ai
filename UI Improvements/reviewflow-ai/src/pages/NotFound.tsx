import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import ChatWidget from "@/components/ChatWidget";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-bg-page text-foreground font-sans">
      <PublicNav />
      
      <main className="flex-1 flex items-center justify-center py-28 px-6 mt-20">
        <div className="text-center w-full max-w-md bg-white border border-border rounded-3xl p-10 shadow-xl">
          <div className="flex justify-center mb-6">
             <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand text-white font-black text-2xl shadow-lg ring-4 ring-brand/10">
               404
             </div>
          </div>
          <h1 className="mb-4 text-3xl font-black text-brand">Page Not Found</h1>
          <p className="mb-8 text-lg text-muted-foreground font-medium">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-brand px-8 text-lg font-bold text-white transition-all hover:bg-brand/90 hover:-translate-y-1 shadow-md active:scale-95"
          >
            Return to Home
          </Link>
        </div>
      </main>

      <PublicFooter />
      <ChatWidget />
    </div>
  );
};

export default NotFound;
