
import React, { createContext, useContext, useRef } from 'react';
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll';

type ScrollContextType = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize Locomotive Scroll
  useLocomotiveScroll({
    ref: containerRef,
    smooth: true,
    multiplier: 0.8,
    class: 'has-scroll-smooth',
  });

  return (
    <ScrollContext.Provider value={{ containerRef }}>
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
