
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
interface LocomotiveScrollInstance {
  destroy: () => void;
  update: () => void;
  scroll: LocomotiveScroll;
}

// Define custom options interface since the library's types are incorrect
interface CustomLocomotiveOptions {
  el: HTMLElement;
  smooth?: boolean;
  multiplier?: number;
  class?: string;
  [key: string]: any; // Allow additional properties
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

    // Initialize Locomotive Scroll with custom options type
    const options: CustomLocomotiveOptions = {
      el: ref.current,
      smooth,
      multiplier,
      class: className,
    };

    locomotiveScrollRef.current = new LocomotiveScroll(options) as unknown as LocomotiveScrollInstance;

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
