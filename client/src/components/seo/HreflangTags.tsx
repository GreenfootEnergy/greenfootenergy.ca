import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { urlTranslations, reverseUrlTranslations } from "@/lib/i18n/urlTranslations";

const BASE_URL = "https://www.greenfootenergy.ca";

interface HreflangTagsProps {
  canonicalPath?: string;
}

export function HreflangTags({ canonicalPath }: HreflangTagsProps) {
  const { language, stripLanguagePrefix } = useLanguage();
  
  const currentPath = typeof window !== "undefined" 
    ? stripLanguagePrefix(window.location.pathname) 
    : "/";
  
  const basePath = canonicalPath || currentPath;
  
  const englishPath = reverseUrlTranslations[basePath] || basePath;
  const frenchPath = urlTranslations[englishPath] || englishPath;
  
  const englishUrl = `${BASE_URL}${englishPath}`;
  const frenchUrl = `${BASE_URL}/fr-ca${frenchPath}`;
  
  const canonicalUrl = language === "fr" ? frenchUrl : englishUrl;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-CA" href={englishUrl} />
      <link rel="alternate" hrefLang="fr-CA" href={frenchUrl} />
      <link rel="alternate" hrefLang="x-default" href={englishUrl} />
      <meta property="og:url" content={canonicalUrl} />
    </Helmet>
  );
}

interface LocalizedMetaProps {
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  canonicalPath?: string;
}

export function LocalizedMeta({ 
  titleEn, 
  titleFr, 
  descriptionEn, 
  descriptionFr,
  canonicalPath 
}: LocalizedMetaProps) {
  const { language } = useLanguage();
  
  const title = language === "fr" ? titleFr : titleEn;
  const description = language === "fr" ? descriptionFr : descriptionEn;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <HreflangTags canonicalPath={canonicalPath} />
    </>
  );
}
