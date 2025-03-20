
import { Toaster } from 'sonner';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6 mt-16">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to access your medical records
            </p>
          </div>
          
          <AuthForm type="sign-in" />
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-medmate-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default SignIn;
