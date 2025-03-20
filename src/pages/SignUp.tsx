
import { Toaster } from 'sonner';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6 mt-16">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">
              Join MedMate to track your medical history
            </p>
          </div>
          
          <AuthForm type="sign-up" />
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-medmate-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default SignUp;
