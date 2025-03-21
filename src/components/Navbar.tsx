import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  X, 
  FileText, 
  User, 
  LayoutDashboard, 
  LogOut, 
  LogIn,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { toast } from 'sonner';

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    const checkAuth = () => {
      const localAuth = localStorage.getItem('medmate-authenticated');
      const cookieAuth = getCookie('medmate-auth');
      
      const isAuth = localAuth === 'true' || cookieAuth === 'true';
      setIsAuthenticated(isAuth);
      
      if (cookieAuth === 'true' && localAuth !== 'true') {
        localStorage.setItem('medmate-authenticated', 'true');
      }
      
      const email = localStorage.getItem('medmate-user-email') || getCookie('medmate-user-email');
      setUserEmail(email);
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('medmate-authenticated');
    localStorage.removeItem('medmate-user-email');
    deleteCookie('medmate-auth');
    deleteCookie('medmate-user-email');
    
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || mobileMenuOpen 
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="font-bold text-2xl text-medmate-600 dark:text-medmate-400 tracking-tight">
            Med<span className="text-medmate-500">Mate</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {isAuthenticated ? (
            <>
              <NavLink href="/dashboard" isActive={isActive('/dashboard')} icon={<LayoutDashboard className="w-4 h-4 mr-1" />}>
                Dashboard
              </NavLink>
              <NavLink href="/timeline" isActive={isActive('/timeline')} icon={<FileText className="w-4 h-4 mr-1" />}>
                Timeline
              </NavLink>
              <NavLink href="/profile" isActive={isActive('/profile')} icon={<User className="w-4 h-4 mr-1" />}>
                Profile
              </NavLink>
              <div className="text-sm text-muted-foreground ml-2 mr-4">
                {userEmail && <span className="hidden lg:inline-block">{userEmail}</span>}
              </div>
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-destructive flex items-center px-3"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link to="/sign-in">
                <Button variant="ghost" size="sm" className="text-foreground hover:text-medmate-600 flex items-center px-3">
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="default" size="sm" className="bg-medmate-500 hover:bg-medmate-600">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            className="p-2 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-medmate-600 dark:text-medmate-400" />
            ) : (
              <Menu className="w-6 h-6 text-medmate-600 dark:text-medmate-400" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-md animate-fade-in">
          <div className="container py-4 flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                <MobileNavLink href="/dashboard" isActive={isActive('/dashboard')} icon={<LayoutDashboard className="w-5 h-5 mr-2" />}>
                  Dashboard
                </MobileNavLink>
                <MobileNavLink href="/timeline" isActive={isActive('/timeline')} icon={<FileText className="w-5 h-5 mr-2" />}>
                  Timeline
                </MobileNavLink>
                <MobileNavLink href="/profile" isActive={isActive('/profile')} icon={<User className="w-5 h-5 mr-2" />}>
                  Profile
                </MobileNavLink>
                <button 
                  className="text-left w-full px-4 py-2 text-muted-foreground hover:text-destructive flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-4">
                <Link to="/sign-in" className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up" className="w-full">
                  <Button variant="default" className="w-full justify-start bg-medmate-500 hover:bg-medmate-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ 
  href, 
  isActive, 
  children, 
  icon 
}: { 
  href: string; 
  isActive: boolean; 
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <Link 
    to={href} 
    className={cn(
      "px-3 py-1.5 text-sm font-medium rounded-md flex items-center transition-colors",
      isActive 
        ? "text-medmate-600 dark:text-medmate-400 bg-medmate-50 dark:bg-medmate-900/50" 
        : "text-muted-foreground hover:text-foreground hover:bg-medmate-50/50 dark:hover:bg-medmate-900/20"
    )}
  >
    {icon}
    {children}
  </Link>
);

const MobileNavLink = ({ 
  href, 
  isActive, 
  children, 
  icon 
}: { 
  href: string; 
  isActive: boolean; 
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <Link 
    to={href} 
    className={cn(
      "px-4 py-2 text-base font-medium rounded-lg flex items-center",
      isActive 
        ? "text-medmate-600 dark:text-medmate-400 bg-medmate-50 dark:bg-medmate-900/50" 
        : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-medmate-900/20"
    )}
  >
    {icon}
    {children}
  </Link>
);

export default Navbar;
