
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import ProfileView from '@/components/Profile';

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('medmate-authenticated');
    setIsAuthenticated(authStatus === 'true');
    
    // Redirect to sign in if not authenticated
    if (authStatus !== 'true') {
      navigate('/sign-in');
    }
  }, [navigate]);
  
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow p-6 md:p-8 pt-24">
        <div className="container">
          <ProfileView />
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Profile;
