import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://vozolegy.com";

const DEFAULT_TITLE = "VOZOL EGY | VOZOL Vape in Egypt";

const DEFAULT_DESCRIPTION =
  "VOZOL EGY - Explore VOZOL vape products, flavors and categories in Egypt.";

const DEFAULT_IMAGE = `${SITE_URL}/ODF.jpg`;
const DEFAULT_KEYWORDS = [
  "VOZOL Egypt",
  "VOZOL EGY",
  "VOZOL vape Egypt",
  "VOZOL في مصر",
  "فوزول مصر",
  "فيب فوزول",
  "اسعار فوزول",
  "سعر VOZOL في مصر",
  "VOZOL vape price Egypt",
  "VOZOL flavors",
  "نكهات VOZOL",
  "شراء VOZOL في مصر",
  "فيب في مصر",
  "vape Egypt",
  "vape online Egypt",
];

const SEO = ({
  title,
  description,
  url,
  image,
  type = "website",
  noIndex = false,
}) => {
  const finalTitle = title || DEFAULT_TITLE;
  const finalDescription = description || DEFAULT_DESCRIPTION;

  const finalUrl = url
    ? url.startsWith("http")
      ? url
      : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`
    : `${SITE_URL}${window.location.pathname}`;

  const finalImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
    : DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{finalTitle}</title>

      <meta name="description" content={finalDescription} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={finalUrl} />

      {/* Open Graph */}

      <meta property="og:title" content={finalTitle} />

      <meta property="og:description" content={finalDescription} />

      <meta property="og:image" content={finalImage} />

      <meta property="og:url" content={finalUrl} />

      <meta property="og:type" content={type} />

      <meta property="og:site_name" content="VOZOL EGY" />

      {/* Twitter */}

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={finalTitle} />

      <meta name="twitter:description" content={finalDescription} />

      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
};

export default SEO;
