
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface UseLocomotiveScrollOptions {
  ref: React.RefObject<HTMLElement>;
  smooth?: boolean;
  multiplier?: number;
  class?: string;
  initOnMount?: boolean;
}

const useLocomotiveScroll = ({
  ref,
  smooth = true,
  multiplier = 1,
  class: className = 'has-scroll-smooth',
  initOnMount = true,
}: UseLocomotiveScrollOptions) => {
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!ref.current || !initOnMount) return;

    // Initialize Locomotive Scroll with proper typing
    locomotiveScrollRef.current = new LocomotiveScroll({
      // Type assertion to accommodate locomotive-scroll's types
      el: ref.current as HTMLElement,
      smooth,
      multiplier,
      class: className,
    } as any);

    // Clean up
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
      }
    };
  }, [ref, smooth, multiplier, className, initOnMount]);

  return locomotiveScrollRef.current;
};

export default useLocomotiveScroll;
