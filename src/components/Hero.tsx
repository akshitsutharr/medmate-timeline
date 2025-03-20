
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Clock, FileText } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (heroRef.current) {
        // Parallax effect
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <FileText className="w-6 h-6 text-medmate-500" />,
      title: "Medical Records Timeline",
      description: "Store and visualize your complete medical history in an elegant, chronological timeline."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-medmate-500" />,
      title: "Secure & Private",
      description: "Your health data is encrypted and protected with the highest security standards."
    },
    {
      icon: <Clock className="w-6 h-6 text-medmate-500" />,
      title: "Accessible Anytime",
      description: "Access your medical records instantly, wherever and whenever you need them."
    }
  ];

  return (
    <div className="relative overflow-hidden pt-24 md:pt-32 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-medmate-50/70 to-background z-0"></div>
      
      {/* Background circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-medmate-200/20 blur-3xl"></div>
      <div className="absolute top-40 left-10 w-72 h-72 rounded-full bg-medmate-100/30 blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-6 animate-fade-in">
            Your Complete Medical History, <span className="text-medmate-600">All in One Place</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in animate-delay-1">
            MedMate helps you store, organize, and access your medical records with ease.
            Take control of your health journey with our secure timeline platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in animate-delay-2">
            <Link to="/sign-up">
              <Button size="lg" className="bg-medmate-500 hover:bg-medmate-600 rounded-full px-8 py-6 w-full">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 w-full">
                Sign In
              </Button>
            </Link>
          </div>
          
          {/* App screenshot/demo visualization */}
          <div 
            ref={heroRef} 
            className="relative mx-auto mb-16 max-w-3xl glass-card p-1 shadow-glass-strong animate-fade-in animate-delay-3"
          >
            <div className="relative overflow-hidden rounded-lg aspect-[16/9] bg-gradient-to-br from-medmate-100 to-white">
              {/* Here you would typically place a screenshot or mockup */}
              <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="h-8 w-32 bg-medmate-200 rounded-full mb-6"></div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="timeline-dot"></div>
                      <div className="ml-4 h-16 w-full bg-white/80 rounded-lg"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="timeline-dot"></div>
                      <div className="ml-4 h-16 w-full bg-white/80 rounded-lg"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="timeline-dot"></div>
                      <div className="ml-4 h-16 w-full bg-white/80 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card-hover p-6 animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="mb-4 inline-block p-3 bg-medmate-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
