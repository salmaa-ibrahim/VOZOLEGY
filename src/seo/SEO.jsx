import React from 'react';
import { Helmet } from 'react-helmet-async'; // Requires: npm install react-helmet-async
// Or just use standard document head manipulation if you want to avoid extra deps.
// For production, react-helmet-async is recommended for SPA SEO.

const SEO = ({ title, description, url, image }) => {
  return (
    <Helmet>
      <title>{title || 'VOZOL EGY - Premium Vape Shop'}</title>
      <meta name="description" content={description || 'Shop the latest VOZOL vapes in Egypt.'} />
      <link rel="canonical" href={url || window.location.href} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || '/images/logo/og-image.webp'} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;