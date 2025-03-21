
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

// Define a more complete interface for the LocomotiveScroll instance
interface LocomotiveScrollInstance extends LocomotiveScroll {
  update: () => void;
  destroy: () => void;
}

const useLocomotiveScroll = ({
  ref,
  smooth = true,
  multiplier = 1,
  class: className = 'has-scroll-smooth',
  initOnMount = true,
}: UseLocomotiveScrollOptions) => {
  const locomotiveScrollRef = useRef<LocomotiveScrollInstance | null>(null);

  useEffect(() => {
    if (!ref.current || !initOnMount) return;

    // Initialize Locomotive Scroll with proper typing
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: ref.current as HTMLElement,
      smooth,
      multiplier,
      class: className,
    }) as LocomotiveScrollInstance;

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
