import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToHash, scrollToTop } from '@/lib/scrollToTop';

/**
 * On route change: scroll to hash target when present, otherwise top of page.
 * Fixes /#services landing on hero when coming from other routes.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      scrollToHash(hash);
    } else {
      scrollToTop();
    }
  }, [pathname, hash]);

  return null;
}
