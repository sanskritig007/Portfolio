import { useReducedMotion } from 'framer-motion';
import { useLocation } from '@remix-run/react';
import { useCallback, useRef } from 'react';

export function useScrollToHash() {
  const scrollTimeout = useRef();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const scrollToHash = useCallback(
    (hash, onDone) => {
      const id = hash?.split('#')?.[1];
      if (!id) return;
      
      const targetElement = document.getElementById(id);
      if (!targetElement) return;

      targetElement.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

      const handleScroll = () => {
        clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
          window.removeEventListener('scroll', handleScroll);

          if (window.location.pathname === location.pathname) {
            onDone?.();
            window.history.replaceState(window.history.state, '', `${location.pathname}#${id}`);
          }
        }, 50);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout.current);
      };
    },
    [reduceMotion, location.pathname]
  );

  return scrollToHash;
}
