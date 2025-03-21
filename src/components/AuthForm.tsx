import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

type AuthFormProps = {
  type: 'sign-in' | 'sign-up';
};

const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

const AuthForm = ({ type }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignInFormValues | SignUpFormValues>({
    resolver: zodResolver(type === 'sign-in' ? signInSchema : signUpSchema),
    defaultValues: type === 'sign-in' 
      ? { email: '', password: '' } 
      : { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: SignInFormValues | SignUpFormValues) => {
    setIsLoading(true);
    
    // Simulate authentication process
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data 
      if (type === 'sign-up') {
        const { name, email } = values as SignUpFormValues;
        localStorage.setItem('medmate-user-profile', JSON.stringify({ name, email, createdAt: new Date() }));
      }
      
      // Set auth in localStorage and cookies (for persistence)
      localStorage.setItem('medmate-authenticated', 'true');
      setCookie('medmate-auth', 'true', 30); // 30 days session

      // Store user email for persistence
      const email = (values as any).email;
      if (email) {
        localStorage.setItem('medmate-user-email', email);
        setCookie('medmate-user-email', email, 30);
      }
      
      // Show success message
      if (type === 'sign-in') {
        toast.success('Welcome back!');
      } else {
        toast.success('Account created successfully!');
      }
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card max-w-md w-full mx-auto p-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6">
        {type === 'sign-in' ? 'Sign In to MedMate' : 'Create Your MedMate Account'}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {type === 'sign-up' && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      {...field} 
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === 'sign-up' && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Confirm your password" 
                        {...field} 
                        className="h-12 pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-6 bg-medmate-500 hover:bg-medmate-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                {type === 'sign-in' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              type === 'sign-in' ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;

