import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
}

const DEFAULT_TITLE = 'Build Bharat Synergy Partners | Multi-Industry Business Ecosystem';
const DEFAULT_DESC = 'Build Bharat Synergy Partners is a premier multi-industry conglomerate integrating Solar Energy, Financial Loans, Real Estate, and EdTech with verified 10-Cadre partner revenue distribution.';
const DEFAULT_KEYWORDS = 'Build Bharat, Build Bharat Synergy Partners, BBSP, Solar Energy, Financial Loans, Real Estate Hyderabad, EdTech, Sriram Solar, 10 Cadres Commission, Business Partnership India';
const SITE_URL = 'https://buildbharatsp.com';
const DEFAULT_OG_IMAGE = 'https://buildbharatsp.com/build-bharat-logo.png';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  structuredData,
}) => {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper to set or create meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', 'Build Bharat Synergy Partners');
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Open Graph Tags
    const fullUrl = `${SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', 'Build Bharat Synergy Partners');

    // 4. Twitter Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // 6. Dynamic JSON-LD Structured Data
    const existingScript = document.getElementById('dynamic-seo-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData) {
      const script = document.createElement('script');
      script.id = 'dynamic-seo-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      const scriptToRemove = document.getElementById('dynamic-seo-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, keywords, canonicalPath, ogType, ogImage, structuredData]);

  return null;
};
