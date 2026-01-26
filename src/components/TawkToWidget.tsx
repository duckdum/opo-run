'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

export default function TawkToWidget() {
  const locale = useLocale();

  useEffect(() => {
    // Tawk.to script injection
    const script = document.createElement('script');
    script.async = true;
    // CORRECT FORMAT: https://embed.tawk.to/PROPERTY_ID/WIDGET_ID
    script.src = 'https://embed.tawk.to/69749cd6ccd68019889d7303/1jfno9a0u';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Wait for script to load before setting language
    script.onload = () => {
      // Set language based on locale
      if (window.Tawk_API) {
        window.Tawk_API.onLoad = function () {
          // Set language: 'pt' for Portuguese, 'en' for English
          window.Tawk_API.setAttributes(
            {
              language: locale === 'pt' ? 'pt' : 'en',
            },
            function (error: any) {
              if (error) {
                console.error('Tawk.to language error:', error);
              }
            },
          );

          // Custom styling - hide ugly elements
          window.Tawk_API.customStyle = {
            visibility: {
              desktop: {
                xOffset: 20,
                yOffset: 20,
              },
              mobile: {
                xOffset: 10,
                yOffset: 10,
              },
            },
          };
        };
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [locale]);

  return null;
}

// TypeScript declaration for Tawk_API
declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      setAttributes: (
        attributes: { language: string },
        callback: (error: any) => void,
      ) => void;
      hideWidget?: () => void;
      showWidget?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}
