import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * مكون SEO لإدارة العناوين ووسوم محركات البحث
 * @param {string} title - عنوان الصفحة
 * @param {string} description - وصف الصفحة
 * @param {string} image - صورة الصفحة للمشاركة
 * @param {string} type - نوع الصفحة (website, article, product)
 * @param {string} url - رابط الصفحة (slug)
 */
export default function SEO({ 
  title, 
  description, 
  image, 
  type = 'website',
  url = '' 
}) {
  const { i18n } = useTranslation();
  const isAr = i18n?.language?.startsWith('ar') || false;
  const siteName = isAr ? 'سوقي' : 'Souqi';
  
  // القيم الافتراضية إذا لم يتم تمريرها
  const defaultDescription = isAr 
    ? 'مرحبا بك في سوقي - وجهتك الأولى للتسوق واكتشاف أحدث المنتجات بأفضل الأسعار.' 
    : 'Welcome to Souqi - Your ultimate shopping destination for the latest products at the best prices.';
    
  const defaultImage = `${window.location.origin}/og-image.png`;
  const defaultFavicon = `${window.location.origin}/favicon.png`;

  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const pageUrl = `${window.location.origin}${url ? (url.startsWith('/') ? url : `/${url}`) : window.location.pathname}`;

  return (
    <Helmet>
      {/* إعدادات اللغة والاتجاه الأساسية */}
      <html lang={i18n.language} dir={isAr ? 'rtl' : 'ltr'} />

      {/* العناوين الأساسية */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* أيقونة الموقع */}
      <link rel="icon" href={defaultFavicon} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}
