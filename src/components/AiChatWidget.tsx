
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Brain, Send, Paperclip, ArrowDown, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AiChatWidget = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello, I'm your medical assistant. I can help you understand your medical records, answer health questions, and provide general information. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample medical data
  const sampleMedicalContext = [
    "Last cholesterol test: 195 mg/dL (optimal)",
    "Blood pressure at last visit: 124/78 mmHg",
    "Allergies: Penicillin, Peanuts",
    "Current medications: Lisinopril 10mg daily"
  ];
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response with random response time
    setTimeout(() => {
      const responses = [
        "Based on your medical history, your symptoms could be related to seasonal allergies. I notice you have a history of allergic rhinitis in your records from last spring.",
        `Looking at your records, I can see your last blood test shows ${sampleMedicalContext[0]}. That's within the healthy range, but we should monitor it.`,
        "I noticed you're taking Lisinopril. Remember to take it consistently at the same time each day for best results in managing your blood pressure.",
        "Your symptoms might be related to your recent medication changes. Would you like me to explain the potential side effects of your current prescriptions?",
        "Based on your medical history and current symptoms, I'd recommend scheduling a follow-up with your primary care physician to discuss these concerns in more detail."
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Card className="glass-card-hover shadow-lg w-full flex flex-col h-[600px] animate-fade-in overflow-hidden">
      <CardHeader className="pb-3 px-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-medmate-100 dark:border-medmate-800 bg-medmate-50 dark:bg-medmate-900">
            <AvatarImage src="" />
            <AvatarFallback className="bg-medmate-100 dark:bg-medmate-800 text-medmate-700 dark:text-medmate-200">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg flex items-center">
              MedMate AI
              <Sparkles className="ml-2 h-4 w-4 text-yellow-500 animate-pulse-subtle" />
            </CardTitle>
            <CardDescription>Your intelligent medical assistant</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto pt-0 pb-4 px-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "flex items-start gap-3 py-2 px-3 rounded-xl max-w-[85%] animate-slide-in",
              message.role === 'user' 
                ? "ml-auto bg-medmate-100 dark:bg-medmate-800 text-slate-800 dark:text-slate-100" 
                : "bg-muted dark:bg-slate-800/50 text-foreground"
            )}
          >
            {message.role === 'assistant' && (
              <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                <AvatarImage src="" />
                <AvatarFallback className="bg-medmate-100 dark:bg-medmate-800 text-medmate-700 dark:text-medmate-200">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className="space-y-1">
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            {message.role === 'user' && (
              <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                <AvatarImage src="" />
                <AvatarFallback className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                  U
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3 p-3 rounded-xl bg-muted dark:bg-slate-800/50 max-w-[85%] animate-pulse">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="bg-medmate-100 dark:bg-medmate-800 text-medmate-700 dark:text-medmate-200">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-medmate-400 dark:bg-medmate-500 animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-medmate-400 dark:bg-medmate-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="h-2 w-2 rounded-full bg-medmate-400 dark:bg-medmate-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="p-4 pt-2 border-t">
        <div className="flex items-end gap-2 w-full">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full flex-shrink-0 text-muted-foreground hover:text-foreground transition-all"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your health or medical records..."
            className="min-h-12 resize-none focus-visible:ring-medmate-500 flex-grow"
            rows={1}
          />
          
          <Button 
            className="flex-shrink-0 rounded-full bg-medmate-500 hover:bg-medmate-600 transition-all"
            size="icon"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AiChatWidget;
