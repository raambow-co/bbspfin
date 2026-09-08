import { useEffect } from 'react';
 
interface GoogleAnalyticsProps {
  currentPath: string;
}
 
export function GoogleAnalytics({ currentPath }: GoogleAnalyticsProps) {
  useEffect(() => {
    // GA4 Placeholder Integration Loading Script
    const trackingId = 'G-XXXXXXX';
    
    // Add scripts dynamically to document head
    if (!document.getElementById('ga-script')) {
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script);
 
      const initScript = document.createElement('script');
      initScript.id = 'ga-init-script';
      initScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${trackingId}');
      `;
      document.head.appendChild(initScript);
    }
 
    // Trigger virtual pageview on path change
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', trackingId, {
        page_path: currentPath,
      });
    }
 
    console.log(`[Google Analytics Tracker] Pageview registered for path: ${currentPath}`);
  }, [currentPath]);
 
  return null; // This component doesn't render any UI elements
}
