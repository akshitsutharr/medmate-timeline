
import { Toaster } from 'sonner';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow mt-16">
        <Hero />
      </main>
      
      <footer className="py-8 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MedMate. All rights reserved.
        </div>
      </footer>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Index;
