
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="transition-transform hover:rotate-12"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-400 animate-pulse-subtle" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700 dark:text-slate-400" />
      )}
    </Button>
  );
};

export default ThemeToggle;
