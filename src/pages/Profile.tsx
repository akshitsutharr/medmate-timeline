
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import ProfileView from '@/components/Profile';
import Onboarding from '@/components/Onboarding';
import ThreeDModel from '@/components/ThreeDModel';
import AiChatWidget from '@/components/AiChatWidget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, FileText, User } from 'lucide-react';
import { useScroll } from '@/contexts/ScrollContext';

const Profile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const navigate = useNavigate();
  const { containerRef } = useScroll();
  
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
    <div className="min-h-screen flex flex-col dark:bg-slate-900 transition-colors duration-300" data-scroll-section>
      <Navbar />
      
      <main className="flex-grow p-6 md:p-8 pt-24" data-scroll-section>
        <div className="container">
          {needsOnboarding ? (
            <Onboarding />
          ) : (
            <div className="w-full max-w-7xl mx-auto">
              <Tabs defaultValue="profile" className="w-full animate-fade-in">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-medmate-500 data-[state=active]:text-white dark:data-[state=active]:bg-medmate-600">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="ai-assistant" className="data-[state=active]:bg-medmate-500 data-[state=active]:text-white dark:data-[state=active]:bg-medmate-600">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger value="medical-documents" className="data-[state=active]:bg-medmate-500 data-[state=active]:text-white dark:data-[state=active]:bg-medmate-600">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="mt-0 animate-fade-in" data-scroll data-scroll-speed="0.5">
                  <ProfileView />
                </TabsContent>
                
                <TabsContent value="ai-assistant" className="mt-0 animate-fade-in" data-scroll data-scroll-speed="0.4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="order-2 lg:order-1" data-scroll data-scroll-speed="0.3">
                      <AiChatWidget />
                    </div>
                    
                    <div className="order-1 lg:order-2 space-y-6" data-scroll data-scroll-speed="0.6">
                      <Card className="glass-card-hover animate-fade-in">
                        <CardHeader>
                          <CardTitle>Your Medical AI Assistant</CardTitle>
                          <CardDescription>
                            Our advanced AI can analyze your medical records and provide personalized health insights
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="h-[300px] w-full bg-gradient-to-br from-medmate-50 to-medmate-100 dark:from-medmate-900 dark:to-medmate-800 rounded-lg overflow-hidden" data-scroll data-scroll-speed="0.2">
                            <ThreeDModel className="w-full h-full" />
                          </div>
                          
                          <div className="mt-6 space-y-4">
                            <h3 className="text-lg font-medium">What the AI can help with:</h3>
                            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                              <li className="animate-slide-in animate-delay-1" data-scroll data-scroll-speed="0.1">Understand your medical reports and test results</li>
                              <li className="animate-slide-in animate-delay-2" data-scroll data-scroll-speed="0.15">Get information about medications and potential side effects</li>
                              <li className="animate-slide-in animate-delay-3" data-scroll data-scroll-speed="0.2">Track symptoms and health patterns over time</li>
                              <li className="animate-slide-in animate-delay-4" data-scroll data-scroll-speed="0.25">Receive personalized health recommendations</li>
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="medical-documents" className="mt-0 animate-fade-in" data-scroll data-scroll-speed="0.3">
                  <Card className="glass-card-hover animate-fade-in">
                    <CardHeader>
                      <CardTitle>Medical Documents</CardTitle>
                      <CardDescription>
                        View and manage your medical documents
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground">
                        This section is under development. Soon you'll be able to upload, organize and analyze your medical records here.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Profile;
