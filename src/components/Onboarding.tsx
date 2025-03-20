
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ChevronRight, 
  FileUp, 
  PlusCircle, 
  User, 
  Home,
  AlertCircle,
  Heart,
  Pill
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import DocumentUpload from './DocumentUpload';

// Define form validation schema
const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  dob: z.string().min(1, { message: 'Date of birth is required.' }),
  gender: z.string().min(1, { message: 'Gender is required.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  conditions: z.string().optional(),
  medications: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDocUploadOpen, setIsDocUploadOpen] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      dob: '',
      gender: '',
      email: '',
      phone: '',
      bloodType: '',
      allergies: '',
      conditions: '',
      medications: '',
    },
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    console.log('Form data submitted:', data);
    
    // Store the user profile data to localStorage
    const userProfile = {
      ...data,
      allergies: data.allergies ? data.allergies.split('\n').filter(Boolean) : [],
      medications: data.medications ? data.medications.split('\n').filter(Boolean) : [],
      conditions: data.conditions ? data.conditions.split('\n').filter(Boolean) : [],
    };
    
    localStorage.setItem('medmate-user-profile', JSON.stringify(userProfile));
    toast.success('Profile information saved successfully!');
    
    if (currentStep === 3) {
      setOnboardingComplete(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      handleNext();
    }
  };

  const handleSkip = () => {
    if (currentStep === 3) {
      setOnboardingComplete(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      handleNext();
    }
  };
  
  const handleOpenDocUpload = () => {
    setIsDocUploadOpen(true);
  };

  const handleDocUploadClose = () => {
    setIsDocUploadOpen(false);
    toast.success('Documents uploaded successfully!');
  };

  const steps = [
    { id: 1, name: 'Personal Information' },
    { id: 2, name: 'Medical Information' },
    { id: 3, name: 'Medical Records' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {onboardingComplete ? (
        <Card className="glass-card mb-8 animate-fade-in">
          <CardContent className="pt-6 pb-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Onboarding Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for setting up your MedMate profile. You're all set to start managing your medical records.
            </p>
            <div className="animate-pulse">
              Redirecting to your dashboard...
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stepper component */}
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className="flex-1 flex flex-col items-center"
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= step.id 
                        ? 'bg-medmate-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="text-xs mt-2 text-center">{step.name}</div>
                </div>
              ))}
            </div>
            <div className="flex mt-2">
              {steps.map((step, idx) => (
                <div 
                  key={`line-${step.id}`}
                  className={`h-1 flex-1 ${
                    idx === steps.length - 1 
                      ? 'hidden' 
                      : currentStep > idx + 1 
                        ? 'bg-medmate-500' 
                        : 'bg-muted'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <Card className="glass-card mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <User className="mr-2 h-5 w-5 text-medmate-500" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Let's start with some basic information about you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Non-binary">Non-binary</SelectItem>
                                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleSkip}
                      >
                        Skip
                      </Button>
                      <Button type="submit" className="bg-medmate-500 hover:bg-medmate-600">
                        Continue
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Medical Information */}
          {currentStep === 2 && (
            <Card className="glass-card mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-medmate-500" />
                  Medical Information
                </CardTitle>
                <CardDescription>
                  Add details about your health to help us personalize your experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Type (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select blood type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="Unknown">Unknown</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <AlertCircle className="mr-2 h-4 w-4 text-medmate-500" />
                            Allergies (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List allergies, one per line" 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter each allergy on a new line
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="conditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Heart className="mr-2 h-4 w-4 text-medmate-500" />
                            Medical Conditions (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List medical conditions, one per line" 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter each condition on a new line
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="medications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Pill className="mr-2 h-4 w-4 text-medmate-500" />
                            Current Medications (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List medications with dosage, one per line" 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter each medication on a new line
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <div className="space-x-3">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={handleSkip}
                        >
                          Skip
                        </Button>
                        <Button type="submit" className="bg-medmate-500 hover:bg-medmate-600">
                          Continue
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Medical Records */}
          {currentStep === 3 && (
            <Card className="glass-card mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <FileUp className="mr-2 h-5 w-5 text-medmate-500" />
                  Import Medical Records
                </CardTitle>
                <CardDescription>
                  Get started by importing your existing medical records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Choose how you want to start building your medical history
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-2 border-medmate-100 hover:border-medmate-300 transition-colors cursor-pointer" onClick={handleOpenDocUpload}>
                      <CardContent className="pt-6 pb-6 text-center">
                        <FileUp className="h-10 w-10 text-medmate-500 mx-auto mb-2" />
                        <h3 className="font-medium mb-2">Upload Documents</h3>
                        <p className="text-xs text-muted-foreground">
                          Upload scanned copies of your medical reports and records
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className="border-2 border-medmate-100 hover:border-medmate-300 transition-colors cursor-pointer"
                      onClick={() => form.handleSubmit(onSubmit)()}
                    >
                      <CardContent className="pt-6 pb-6 text-center">
                        <PlusCircle className="h-10 w-10 text-medmate-500 mx-auto mb-2" />
                        <h3 className="font-medium mb-2">Add Manually</h3>
                        <p className="text-xs text-muted-foreground">
                          Start fresh and add records to your timeline one by one
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => form.handleSubmit(onSubmit)()} 
                      className="bg-medmate-500 hover:bg-medmate-600"
                    >
                      Complete Setup
                      <Home className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
      
      <DocumentUpload 
        isOpen={isDocUploadOpen} 
        onClose={handleDocUploadClose} 
      />
    </div>
  );
};

export default Onboarding;
