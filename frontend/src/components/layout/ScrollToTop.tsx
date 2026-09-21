import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets window scroll position to top on route change.
 * Should be placed inside <BrowserRouter>
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If not navigating to a hash link, scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
