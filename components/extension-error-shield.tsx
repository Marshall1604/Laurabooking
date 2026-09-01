'use client';

import { useEffect } from 'react';

export function ExtensionErrorShield() {
  useEffect(() => {
    // Intercept and swallow unhandled rejections and errors originating from browser extensions
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const reasonStr = String(reason?.stack || reason?.message || reason || '');
      
      // If error is from chrome-extension://, moz-extension://, or known extension IDs/variables (like M_ID)
      if (
        reasonStr.includes('chrome-extension://') ||
        reasonStr.includes('moz-extension://') ||
        reasonStr.includes('safari-extension://') ||
        reasonStr.includes('M_ID') ||
        reasonStr.includes('eppiocemhmnlbhjplcgkofciiegomcon')
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    const handleError = (event: ErrorEvent) => {
      const filename = event.filename || '';
      const message = event.message || '';
      if (
        filename.includes('chrome-extension://') ||
        filename.includes('moz-extension://') ||
        message.includes('M_ID') ||
        filename.includes('eppiocemhmnlbhjplcgkofciiegomcon')
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);
    window.addEventListener('error', handleError, true);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      window.removeEventListener('error', handleError, true);
    };
  }, []);

  return null;
}
