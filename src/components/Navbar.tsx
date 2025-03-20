
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  X, 
  FileText, 
  User, 
  LayoutDashboard, 
  LogOut, 
  LogIn 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // This is a placeholder for actual authentication
  // In a real implementation, this would check if the user is logged in
  useEffect(() => {
    // Check localStorage or session for authenticated status
    const checkAuth = localStorage.getItem('medmate-authenticated');
    setIsAuthenticated(checkAuth === 'true');
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
    setIsAuthenticated(false);
    // Navigate to home page or login page
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || mobileMenuOpen 
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="font-bold text-2xl text-medmate-600 tracking-tight">
            Med<span className="text-medmate-500">Mate</span>
          </div>
        </Link>

        {/* Desktop Menu */}
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

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-medmate-600" />
          ) : (
            <Menu className="w-6 h-6 text-medmate-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-lg shadow-md animate-fade-in">
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

// Helper components for nav links
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
        ? "text-medmate-600 bg-medmate-50" 
        : "text-muted-foreground hover:text-foreground hover:bg-medmate-50/50"
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
        ? "text-medmate-600 bg-medmate-50" 
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    )}
  >
    {icon}
    {children}
  </Link>
);

export default Navbar;
