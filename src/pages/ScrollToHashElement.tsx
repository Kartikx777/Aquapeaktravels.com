// pages/ScrollToHashElement.tsx or utils/ScrollToHashElement.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHashElement = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      if (hash) {
        const id = hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 100); // Wait for sections to mount
        }
      }
    }
  }, [hash, pathname]);

  return null;
};

export default ScrollToHashElement;
