
import { useState } from 'react';
import { 
  User, 
  Heart, 
  AlertCircle, 
  Pill, 
  Calendar, 
  FileEdit, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  Save,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// Mock user data
const mockUserData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  address: '123 Main Street, Anytown, CA 12345',
  dob: '1985-06-15',
  gender: 'Male',
  emergencyContact: 'Sarah Johnson (Wife) - (555) 987-6543',
  bloodType: 'O+',
  allergies: [
    'Penicillin',
    'Peanuts',
    'Latex'
  ],
  medications: [
    'Lisinopril 10mg - Daily',
    'Atorvastatin 20mg - Evening'
  ],
  conditions: [
    'Hypertension (Diagnosed 2020)',
    'High Cholesterol (Diagnosed 2019)'
  ],
  avatar: '' // Placeholder for avatar image
};

const ProfileView = () => {
  const [userData, setUserData] = useState(mockUserData);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(mockUserData);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle editing mode
  const toggleEditing = () => {
    if (editing) {
      // Cancel editing - reset form data
      setFormData(userData);
    }
    setEditing(!editing);
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUserData(formData);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">My Profile</h1>
        
        <Button 
          onClick={toggleEditing}
          variant={editing ? "outline" : "default"}
          className={editing ? "" : "bg-medmate-500 hover:bg-medmate-600"}
        >
          {editing ? (
            <>Cancel Editing</>
          ) : (
            <>
              <FileEdit className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Personal Information Card */}
      <Card className="glass-card-hover animate-fade-in">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-medmate-100">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="bg-medmate-100 text-medmate-700 text-lg">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <CardTitle className="text-xl">{userData.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {new Date(userData.dob).toLocaleDateString('en-US', { 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  <span className="mx-2">•</span>
                  {userData.gender}
                </CardDescription>
              </div>
            </div>
            
            {editing && !isLoading && (
              <Button 
                onClick={handleSaveProfile} 
                className="mt-2 md:mt-0 bg-medmate-500 hover:bg-medmate-600"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            )}
            
            {isLoading && (
              <Button disabled className="mt-2 md:mt-0">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-medium flex items-center mb-4">
              <User className="mr-2 h-4 w-4 text-medmate-500" />
              Contact Information
            </h3>

            {editing ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input 
                    id="emergencyContact" 
                    name="emergencyContact" 
                    value={formData.emergencyContact} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{userData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{userData.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Emergency Contact</p>
                    <p className="text-sm text-muted-foreground">{userData.emergencyContact}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          {/* Medical Information */}
          <div>
            <h3 className="text-sm font-medium flex items-center mb-4">
              <Heart className="mr-2 h-4 w-4 text-medmate-500" />
              Medical Information
            </h3>
            
            {editing ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select 
                    value={formData.bloodType} 
                    onValueChange={(value) => handleSelectChange(value, 'bloodType')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="outline" className="bg-medmate-50 text-medmate-700 hover:bg-medmate-100">
                  Blood Type: {userData.bloodType}
                </Badge>
              </div>
            )}
          </div>
          
          {/* Allergies */}
          <div>
            <h3 className="text-sm font-medium flex items-center mb-3">
              <AlertCircle className="mr-2 h-4 w-4 text-medmate-500" />
              Allergies
            </h3>
            
            {editing ? (
              <div className="space-y-2">
                <Textarea 
                  id="allergies" 
                  name="allergies"
                  placeholder="List allergies separated by commas" 
                  value={formData.allergies.join('\n')}
                  onChange={(e) => {
                    const allergies = e.target.value.split('\n').filter(Boolean);
                    setFormData(prev => ({ ...prev, allergies }));
                  }}
                  className="min-h-24"
                />
                <p className="text-xs text-muted-foreground">List each allergy on a new line</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {userData.allergies.length > 0 ? (
                  userData.allergies.map((allergy, index) => (
                    <Badge key={index} variant="outline" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                      {allergy}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No known allergies</p>
                )}
              </div>
            )}
          </div>
          
          {/* Medications */}
          <div>
            <h3 className="text-sm font-medium flex items-center mb-3">
              <Pill className="mr-2 h-4 w-4 text-medmate-500" />
              Current Medications
            </h3>
            
            {editing ? (
              <div className="space-y-2">
                <Textarea 
                  id="medications" 
                  name="medications"
                  placeholder="List medications with dosage" 
                  value={formData.medications.join('\n')}
                  onChange={(e) => {
                    const medications = e.target.value.split('\n').filter(Boolean);
                    setFormData(prev => ({ ...prev, medications }));
                  }}
                  className="min-h-24"
                />
                <p className="text-xs text-muted-foreground">List each medication on a new line</p>
              </div>
            ) : (
              <ul className="space-y-1 list-disc pl-5">
                {userData.medications.length > 0 ? (
                  userData.medications.map((medication, index) => (
                    <li key={index} className="text-sm">
                      {medication}
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No current medications</p>
                )}
              </ul>
            )}
          </div>
          
          {/* Medical Conditions */}
          <div>
            <h3 className="text-sm font-medium flex items-center mb-3">
              <Heart className="mr-2 h-4 w-4 text-medmate-500" />
              Medical Conditions
            </h3>
            
            {editing ? (
              <div className="space-y-2">
                <Textarea 
                  id="conditions" 
                  name="conditions"
                  placeholder="List medical conditions" 
                  value={formData.conditions.join('\n')}
                  onChange={(e) => {
                    const conditions = e.target.value.split('\n').filter(Boolean);
                    setFormData(prev => ({ ...prev, conditions }));
                  }}
                  className="min-h-24"
                />
                <p className="text-xs text-muted-foreground">List each condition on a new line</p>
              </div>
            ) : (
              <ul className="space-y-1 list-disc pl-5">
                {userData.conditions.length > 0 ? (
                  userData.conditions.map((condition, index) => (
                    <li key={index} className="text-sm">
                      {condition}
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No medical conditions</p>
                )}
              </ul>
            )}
          </div>
        </CardContent>
        
        {editing && (
          <CardFooter className="flex justify-end border-t bg-muted/30 pt-6">
            <div className="flex gap-2">
              <Button variant="outline" onClick={toggleEditing}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveProfile} 
                disabled={isLoading}
                className="bg-medmate-500 hover:bg-medmate-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ProfileView;
