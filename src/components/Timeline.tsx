import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  FileText, 
  FilePlus,
  ChevronDown, 
  ChevronUp, 
  Search,
  Hospital,
  Heart,
  Pill,
  Stethoscope
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import DocumentUpload from './DocumentUpload';

// Record type icons mapping
const typeIcons: Record<string, any> = {
  'Checkup': Stethoscope,
  'Lab Test': Hospital,
  'Vaccination': Pill,
  'Specialist': Heart,
  'Hospitalization': Hospital,
  'Surgery': Hospital,
  'Imaging': Hospital,
  'Other': FileText
};

const TimelineView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRecords, setExpandedRecords] = useState<number[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load records from localStorage
  useEffect(() => {
    const loadRecords = () => {
      try {
        const savedRecords = JSON.parse(localStorage.getItem('medical-records') || '[]');
        // Convert string dates to Date objects
        const processedRecords = savedRecords.map((record: any) => ({
          ...record,
          date: new Date(record.date),
          icon: typeIcons[record.type] || FileText
        }));
        setRecords(processedRecords);
      } catch (error) {
        console.error('Error loading records:', error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
    // Add event listener for storage changes
    window.addEventListener('storage', loadRecords);
    return () => window.removeEventListener('storage', loadRecords);
  }, []);

  // Handle new document added
  const handleDocumentAdded = (newDocument: any) => {
    const processedDoc = {
      ...newDocument,
      icon: typeIcons[newDocument.type] || FileText
    };
    setRecords(prev => [processedDoc, ...prev]);
  };

  // Filter records based on search query
  const filteredRecords = records.filter(record => {
    if (!record) return false;
    
    const searchFields = [
      record.title || '',
      record.type || '',
      record.provider || '',
      record.location || '',
      record.description || '',
      ...(record.documents?.map((doc: any) => doc.name) || [])
    ].join(' ').toLowerCase();
    
    return searchFields.includes(searchQuery.toLowerCase());
  }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date descending

  const toggleRecordExpansion = (id: number) => {
    setExpandedRecords(prev => 
      prev.includes(id) 
        ? prev.filter(recordId => recordId !== id) 
        : [...prev, id]
    );
  };

  const groupRecordsByYear = () => {
    const groups: Record<string, any[]> = {};
    
    filteredRecords.forEach(record => {
      if (!record.date) return;
      const year = record.date.getFullYear().toString();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(record);
    });
    
    return groups;
  };

  const recordGroups = groupRecordsByYear();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">Medical Records Timeline</h1>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Button 
            onClick={() => setIsUploadModalOpen(true)} 
            className="whitespace-nowrap bg-medmate-500 hover:bg-medmate-600"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="glass-card p-8 text-center">
          <Loader2 className="animate-spin h-8 w-8 mx-auto text-medmate-500 mb-4" />
          <p className="text-muted-foreground">Loading your medical records...</p>
        </div>
      ) : Object.keys(recordGroups).length === 0 ? (
        <div className="glass-card p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Records Found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery 
              ? `No records matching "${searchQuery}"`
              : "You haven't added any medical records yet"}
          </p>
          <Button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-medmate-500 hover:bg-medmate-600"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Add Your First Record
          </Button>
        </div>
      ) : (
        Object.entries(recordGroups).map(([year, records]) => (
          <div key={year} className="mb-10 fade-in-bottom">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medmate-100 text-medmate-700 mr-3">
                <Calendar className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">{year}</h2>
            </div>
            
            <div className="relative pl-10">
              <div className="timeline-line"></div>
              
              {records.map((record, index) => {
                const isExpanded = expandedRecords.includes(record.id);
                const IconComponent = record.icon;
                
                return (
                  <div 
                    key={record.id} 
                    className={cn(
                      "timeline-card",
                      isExpanded ? "shadow-glass-strong" : "",
                      "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute -left-10 mt-1 timeline-dot"></div>
                    
                    <div 
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => toggleRecordExpansion(record.id)}
                    >
                      <div>
                        <div className="text-sm text-muted-foreground mb-1 flex items-center">
                          <IconComponent className="h-3.5 w-3.5 mr-1 inline" />
                          <span>{record.type}</span>
                          <span className="mx-2">•</span>
                          <span>{format(record.date, 'MMM d, yyyy')}</span>
                        </div>
                        <h3 className="font-medium text-lg">{record.title}</h3>
                        <p className="text-sm text-muted-foreground">{record.provider} • {record.location}</p>
                      </div>
                      
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </Button>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium mb-1">Description</h4>
                          <p className="text-sm text-muted-foreground">{record.description}</p>
                        </div>
                        
                        {record.documents.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Documents</h4>
                            <div className="space-y-2">
                              {record.documents.map((doc, i) => (
                                <div 
                                  key={i} 
                                  className="flex items-center justify-between p-2 bg-background rounded-md hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 text-medmate-500 mr-2" />
                                    <span className="text-sm">{doc.name}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-xs text-muted-foreground mr-3">{doc.size}</span>
                                    <Button variant="ghost" size="sm" className="h-8 px-2">
                                      View
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
      
      <DocumentUpload 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onDocumentAdded={handleDocumentAdded}
      />
    </div>
  );
};

export default TimelineView;
