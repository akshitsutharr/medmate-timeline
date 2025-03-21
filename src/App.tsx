
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ScrollProvider } from "./contexts/ScrollContext";

// Cookie helper
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const queryClient = new QueryClient();

const AppContent = () => {
  // Check for auth in cookies on app load and restore if needed
  useEffect(() => {
    const cookieAuth = getCookie('medmate-auth');
    const localAuth = localStorage.getItem('medmate-authenticated');
    
    // If cookie auth exists but localStorage doesn't, restore session
    if (cookieAuth === 'true' && localAuth !== 'true') {
      localStorage.setItem('medmate-authenticated', 'true');
    }
    
    // Restore user email
    const cookieEmail = getCookie('medmate-user-email');
    if (cookieEmail && !localStorage.getItem('medmate-user-email')) {
      localStorage.setItem('medmate-user-email', cookieEmail);
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ScrollProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </ScrollProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
