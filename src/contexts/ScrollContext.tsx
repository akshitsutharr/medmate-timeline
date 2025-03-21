
import React, { createContext, useContext, useRef, useEffect } from 'react';
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll';
import { useIsMobile } from '@/hooks/use-mobile';

// Import the interface or define it inline
interface LocomotiveScrollInstance extends LocomotiveScroll {
  update: () => void;
  destroy: () => void;
}

type ScrollContextType = {
  containerRef: React.RefObject<HTMLDivElement>;
  scrollInstance: LocomotiveScrollInstance | null;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Initialize Locomotive Scroll with conditional smooth scrolling based on device
  const scrollInstance = useLocomotiveScroll({
    ref: containerRef,
    smooth: !isMobile, // Disable smooth scroll on mobile for better performance
    multiplier: 0.8,
    class: 'has-scroll-smooth',
  });

  // Update scroll on route change and window resize
  useEffect(() => {
    if (!scrollInstance) return;
    
    const handleResize = () => {
      scrollInstance.update();
    };

    // Update scroll on window resize
    window.addEventListener('resize', handleResize);
    
    // Initial update
    setTimeout(() => {
      scrollInstance.update();
    }, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollInstance]);

  return (
    <ScrollContext.Provider value={{ containerRef, scrollInstance }}>
      <div 
        ref={containerRef} 
        className="app-container" 
        data-scroll-container
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
