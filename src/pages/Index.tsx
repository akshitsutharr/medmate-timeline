
import { Toaster } from 'sonner';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Brain, 
  BarChartBig, 
  ListChecks, 
  ShieldCheck, 
  Clock, 
  FileText,
  Heart,
  Users,
  ArrowRight,
  MessageSquare,
  Send
} from 'lucide-react';

const Index = () => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiQuery = () => {
    if (!aiQuery.trim()) return;
    
    setIsAiLoading(true);
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your symptoms, you should consider scheduling a check-up with your primary care physician.",
        "Your records show you're due for an annual physical exam. Would you like me to help you schedule one?",
        "I've analyzed your recent lab results. Your cholesterol levels appear to be improving compared to your last test.",
        "Remember to take your medication as prescribed. Your adherence has been excellent so far!",
      ];
      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsAiLoading(false);
    }, 1500);
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "MedMate has revolutionized how I manage my healthcare. Having all my records in one place has saved me countless hours and stress.",
      avatar: "SJ"
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      content: "As a physician, I appreciate how MedMate empowers my patients. The organized timeline helps me quickly understand their medical history.",
      avatar: "MC"
    },
    {
      name: "Robert Williams",
      role: "Chronic Care Patient",
      content: "Living with multiple conditions means juggling many specialists and tests. MedMate keeps everything organized so nothing falls through the cracks.",
      avatar: "RW"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* AI Assistant Section */}
        <section className="py-16 bg-medmate-50/30">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">
                  Your Personal Health Assistant
                </h2>
                <p className="text-muted-foreground mb-6">
                  MedMate's AI assistant analyzes your medical data to provide personalized insights, 
                  reminders, and recommendations to help you stay on top of your health.
                </p>
                
                <div className="glass-card p-4 mb-6">
                  <div className="flex gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-medmate-100 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-medmate-700" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">MedMate AI</div>
                      <div className="text-sm text-muted-foreground">Always here to help</div>
                    </div>
                  </div>
                  
                  {aiResponse && (
                    <div className="mb-3 p-3 bg-background rounded-lg">
                      <p className="text-sm">{aiResponse}</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Input 
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Ask about your health..." 
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleAiQuery} 
                      disabled={isAiLoading}
                      className="bg-medmate-500 hover:bg-medmate-600"
                    >
                      {isAiLoading ? (
                        <div className="animate-spin h-4 w-4 border-2 border-medmate-200 border-t-medmate-600 rounded-full" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Link to="/sign-up">
                  <Button variant="outline" className="w-full">
                    Try the AI Assistant <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full bg-medmate-100/40 blur-2xl"></div>
                  <div className="glass-card p-1 shadow-glass-strong">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-medmate-100 to-white flex items-center justify-center">
                      <div className="text-center p-8">
                        <Brain className="h-16 w-16 text-medmate-500 mx-auto mb-4 opacity-70" />
                        <p className="text-lg font-medium text-medmate-700">AI-Powered Health Insights</p>
                        <p className="text-sm text-medmate-600 mt-2">Personalized recommendations based on your medical history</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How MedMate Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Take control of your health data with our easy-to-use platform. Here's how you can get started with MedMate in just a few steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FileText className="h-10 w-10 text-medmate-500" />,
                  title: "Upload Documents",
                  description: "Add medical reports, prescriptions, and lab results to your secure timeline."
                },
                {
                  icon: <BarChartBig className="h-10 w-10 text-medmate-500" />,
                  title: "Track Health Progress",
                  description: "Visualize your health journey over time with intuitive charts and analytics."
                },
                {
                  icon: <ListChecks className="h-10 w-10 text-medmate-500" />,
                  title: "Get Insights",
                  description: "Receive personalized recommendations and reminders based on your medical history."
                }
              ].map((step, index) => (
                <Card key={index} className="text-center glass-card-hover">
                  <CardHeader>
                    <div className="mx-auto bg-medmate-50 p-4 rounded-full inline-flex mb-2">
                      {step.icon}
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-medmate-50/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Thousands of patients and healthcare providers trust MedMate to manage their medical records.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="glass-card-hover">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-medmate-100 flex items-center justify-center text-medmate-700 font-medium mr-3">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container max-w-5xl mx-auto px-4">
            <Card className="glass-card bg-gradient-to-r from-medmate-50 to-background">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Ready to Take Control of Your Health Data?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Join thousands of users who are already managing their medical records with MedMate.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/sign-up">
                        <Button size="lg" className="bg-medmate-500 hover:bg-medmate-600 w-full">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to="/sign-in">
                        <Button size="lg" variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-medmate-100/50 blur-xl"></div>
                      <div className="w-32 h-32 rounded-full bg-medmate-100 flex items-center justify-center">
                        <Heart className="h-16 w-16 text-medmate-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">MedMate</h3>
              <p className="text-muted-foreground mb-4">
                Your complete medical history, all in one secure place.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-sm mb-4">PRODUCT</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-medmate-500">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-medmate-500">Security</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-medmate-500">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-sm mb-4">RESOURCES</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-medmate-500">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-medmate-500">Help Center</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-medmate-500">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-sm mb-4">COMPANY</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-medmate-500">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-medmate-500">Contact</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-medmate-500">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MedMate. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <Users className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">LinkedIn</span>
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Index;
