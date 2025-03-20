
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, 
  BarChart, 
  LineChart, 
  Pie, 
  Cell, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  FileText, 
  CalendarClock, 
  Pill, 
  Heart, 
  Activity, 
  FilePlus,
  ArrowRight,
  Stethoscope,
  Hospital,
  PlusCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for charts
const recordTypeData = [
  { name: 'Checkups', value: 6, color: '#0ca1eb' },
  { name: 'Lab Tests', value: 4, color: '#36b9fa' },
  { name: 'Vaccinations', value: 3, color: '#7cd0fd' },
  { name: 'Specialist', value: 2, color: '#b9e5fe' },
];

const recordsOverTimeData = [
  { month: 'Jan', records: 1 },
  { month: 'Feb', records: 0 },
  { month: 'Mar', records: 2 },
  { month: 'Apr', records: 1 },
  { month: 'May', records: 3 },
  { month: 'Jun', records: 0 },
  { month: 'Jul', records: 1 },
  { month: 'Aug', records: 2 },
  { month: 'Sep', records: 1 },
  { month: 'Oct', records: 0 },
  { month: 'Nov', records: 4 },
  { month: 'Dec', records: 0 },
];

const vitalsData = [
  { name: 'Jul', bp: '120/80', hr: 72, weight: 155 },
  { name: 'Aug', bp: '118/78', hr: 70, weight: 153 },
  { name: 'Sep', bp: '122/82', hr: 74, weight: 154 },
  { name: 'Oct', bp: '119/79', hr: 71, weight: 152 },
  { name: 'Nov', bp: '120/80', hr: 72, weight: 152 },
  { name: 'Dec', bp: '118/76', hr: 68, weight: 151 },
];

// Mock upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    date: '2024-06-15T14:30:00',
    title: 'Annual Physical',
    provider: 'Dr. Sarah Johnson',
    location: 'City Health Clinic',
    icon: Stethoscope
  },
  {
    id: 2,
    date: '2024-06-28T10:00:00',
    title: 'Dental Checkup',
    provider: 'Dr. James Thompson',
    location: 'Smile Dental Center',
    icon: Hospital
  }
];

// Mock recent records
const recentRecords = [
  {
    id: 1,
    date: '2024-05-10',
    title: 'Blood Test Results',
    type: 'Lab Test',
    icon: Hospital
  },
  {
    id: 2,
    date: '2024-04-28',
    title: 'COVID-19 Vaccination',
    type: 'Vaccination',
    icon: Pill
  },
  {
    id: 3,
    date: '2024-04-15',
    title: 'Cardiology Checkup',
    type: 'Specialist',
    icon: Heart
  }
];

// Format date string to display
function formatDateDisplay(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  const options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  
  return isToday 
    ? `Today, ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}` 
    : date.toLocaleString(undefined, options);
}

const DashboardView = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Your health at a glance</p>
        </div>
        
        <div className="flex gap-2">
          <Link to="/timeline">
            <Button variant="outline" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              View Timeline
            </Button>
          </Link>
          
          <Link to="/timeline">
            <Button className="bg-medmate-500 hover:bg-medmate-600">
              <FilePlus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Top row: Cards with recent data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming appointments */}
        <Card className="glass-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarClock className="mr-2 h-5 w-5 text-medmate-500" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => {
                  const IconComponent = appointment.icon;
                  
                  return (
                    <div key={appointment.id} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-medmate-50 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-medmate-500" />
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{appointment.title}</p>
                        <p className="text-xs text-muted-foreground">{formatDateDisplay(appointment.date)}</p>
                        <p className="text-xs text-muted-foreground">{appointment.provider} • {appointment.location}</p>
                      </div>
                    </div>
                  );
                })}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between text-medmate-500 hover:text-medmate-600 hover:bg-medmate-50 mt-2"
                >
                  View All Appointments
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <CalendarClock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-4">No upcoming appointments</p>
                <Button variant="outline" size="sm" className="text-xs">
                  <PlusCircle className="mr-1 h-3.5 w-3.5" />
                  Add Appointment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Records */}
        <Card className="glass-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-medmate-500" />
              Recent Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRecords.map(record => {
                const IconComponent = record.icon;
                
                return (
                  <div key={record.id} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-medmate-50 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-medmate-500" />
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{record.title}</p>
                      <p className="text-xs text-muted-foreground">{record.date} • {record.type}</p>
                    </div>
                  </div>
                );
              })}
              
              <Link to="/timeline">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between text-medmate-500 hover:text-medmate-600 hover:bg-medmate-50 mt-2"
                >
                  View Timeline
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Health Stats */}
        <Card className="glass-card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="mr-2 h-5 w-5 text-medmate-500" />
              Health Vitals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Blood Pressure</p>
                  <p className="text-xl font-medium">120/80</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Heart Rate</p>
                  <p className="text-xl font-medium">72 bpm</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Weight</p>
                  <p className="text-xl font-medium">152 lbs</p>
                </div>
              </div>
              
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vitalsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={[60, 80]} hide />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        border: 'none'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hr" 
                      stroke="#0ca1eb" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-between text-medmate-500 hover:text-medmate-600 hover:bg-medmate-50"
              >
                Record New Vitals
                <PlusCircle className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Middle row: Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Record Types Pie Chart */}
        <Card className="glass-card-hover">
          <CardHeader>
            <CardTitle className="text-lg">Record Types</CardTitle>
            <CardDescription>Distribution of your medical records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={recordTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {recordTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} records`, 'Count']} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Records Over Time */}
        <Card className="glass-card-hover">
          <CardHeader>
            <CardTitle className="text-lg">Records Over Time</CardTitle>
            <CardDescription>Monthly record entries this year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recordsOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => [`${value} records`, 'Records']} 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: 'none'
                    }}
                  />
                  <Bar dataKey="records" fill="#0ca1eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom row: Quick actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/timeline">
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2">
                <FilePlus className="h-6 w-6 text-medmate-500" />
                <span>Add Record</span>
              </Button>
            </Link>
            
            <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2">
              <CalendarClock className="h-6 w-6 text-medmate-500" />
              <span>Schedule Appointment</span>
            </Button>
            
            <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2">
              <Pill className="h-6 w-6 text-medmate-500" />
              <span>Track Medication</span>
            </Button>
            
            <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2">
              <Heart className="h-6 w-6 text-medmate-500" />
              <span>Update Vitals</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardView;
