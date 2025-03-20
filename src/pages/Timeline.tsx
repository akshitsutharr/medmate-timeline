
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import TimelineView from '@/components/Timeline';
import Onboarding from '@/components/Onboarding';

const Timeline = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('medmate-authenticated');
    setIsAuthenticated(authStatus === 'true');
    
    // Check if user needs onboarding
    const userProfile = localStorage.getItem('medmate-user-profile');
    setNeedsOnboarding(!userProfile);
    
    // Redirect to sign in if not authenticated
    if (authStatus !== 'true') {
      navigate('/sign-in');
    }
  }, [navigate]);
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="min-h-screen flex flex-col dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow p-6 md:p-8 pt-24">
        <div className="container">
          {needsOnboarding ? (
            <Onboarding />
          ) : (
            <TimelineView />
          )}
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Timeline;
