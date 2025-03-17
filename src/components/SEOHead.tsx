import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title = "WordCountrr - Online Text & File Word Counter | Character & Page Analysis",
  description = "Accurately count words, compare texts, and analyze website word counts. Features include text comparison tools, URL-based website analysis, PDF/DOCX/TXT support, and advanced writing statistics.",
  canonicalPath
}) => {
  const baseUrl = "https://wordcountrr.com";
  const fullCanonicalUrl = `${baseUrl}${canonicalPath}`;
  
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={fullCanonicalUrl} />
    </Helmet>
  );
};

export default SEOHead;
