
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Upload, X, FileText, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

type DocumentUploadProps = {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded?: (document: any) => void;
};

const DocumentUpload = ({ isOpen, onClose, onDocumentAdded }: DocumentUploadProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [recordType, setRecordType] = useState('');
  const [provider, setProvider] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !date || !recordType) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create document object
      const newDocument = {
        id: Date.now(),
        date,
        type: recordType,
        title,
        provider,
        location,
        description,
        documents: files.map(file => ({
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          file
        })),
      };
      
      // Save to localStorage
      const existingDocs = JSON.parse(localStorage.getItem('medical-records') || '[]');
      const updatedDocs = [newDocument, ...existingDocs];
      localStorage.setItem('medical-records', JSON.stringify(updatedDocs));
      
      // Call callback if exists
      if (onDocumentAdded) {
        onDocumentAdded(newDocument);
      }
      
      toast.success('Medical record added successfully');
      resetForm();
      onClose();
    } catch (error) {
      toast.error('Failed to upload record');
      console.error('Upload error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDate(new Date());
    setRecordType('');
    setProvider('');
    setLocation('');
    setDescription('');
    setFiles([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Medical Record</DialogTitle>
          <DialogDescription>
            Upload a new medical record to your timeline
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="required">Record Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g., Annual Physical Exam"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date" className="required">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type" className="required">Record Type</Label>
              <Select value={recordType} onValueChange={setRecordType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Checkup">Checkup</SelectItem>
                  <SelectItem value="Lab Test">Lab Test</SelectItem>
                  <SelectItem value="Vaccination">Vaccination</SelectItem>
                  <SelectItem value="Specialist">Specialist Visit</SelectItem>
                  <SelectItem value="Hospitalization">Hospitalization</SelectItem>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                  <SelectItem value="Imaging">Imaging</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Healthcare Provider</Label>
              <Input 
                id="provider" 
                value={provider} 
                onChange={(e) => setProvider(e.target.value)} 
                placeholder="e.g., Dr. Smith"
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="location">Location/Facility</Label>
              <Input 
                id="location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="e.g., City Medical Center"
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Enter details about this medical record"
                className="h-24"
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label>Upload Documents</Label>
              
              <div className="border-2 border-dashed border-muted rounded-md p-6 flex flex-col items-center justify-center text-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag & drop your files here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, JPG, PNG up to 10MB
                </p>
                <Input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange} 
                  multiple 
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mt-4" 
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Browse Files
                </Button>
              </div>
              
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Selected Files:</p>
                  {files.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 bg-muted rounded-md text-sm"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-medmate-500 mr-2" />
                        <span className="truncate max-w-[250px]">{file.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground mr-3">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-medmate-500 hover:bg-medmate-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>Save Record</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUpload;
