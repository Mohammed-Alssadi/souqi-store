import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone,
  Send
} from 'lucide-react';

function Footer() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');

  return (
    <footer className="bg-gray-50 dark:bg-zinc-950 border-t border-border pt-12 mt-16 transition-colors duration-300">
      
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 border-b border-border/60 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          <div className="text-center md:text-start flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {t('footer.subscribe', 'Subscribe to Our Newsletter')}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t('footer.subscribeSub', 'Get the latest updates on new products and upcoming sales.')}
            </p>
          </div>

          <div className="relative w-full sm:max-w-md flex-1">
            <div className="flex relative">
              <input 
                type="email" 
                placeholder={t('footer.yourEmail', 'Your email address...')} 
                className="w-full py-3.5 px-6 rounded-full border border-border bg-white dark:bg-zinc-900 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm transition-all" 
              />
              <button className="absolute end-1.5 top-1.5 bottom-1.5 bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-full font-medium flex items-center gap-2 transition-transform hover:scale-105">
                <span className="hidden sm:inline">{t('footer.subscribeBtn', 'Subscribe')}</span>
                <Send size={16} className={isAr ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-16 max-w-7xl mx-auto">
          
          {/* 1. Brand & About */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="inline-block group">
              {isAr ? (
                <div className="flex items-center font-logo-rest-ar font-black" dir="rtl">
                  <span className="text-primary text-4xl leading-none">س&zwj;</span>
                  <span className="text-foreground text-4xl leading-none tracking-tight">&zwj;وقي</span>
                  <span className="text-primary text-4xl leading-none ms-1 group-hover:animate-bounce inline-block">.</span>
                </div>
              ) : (
                <div className="flex items-baseline" dir="ltr">
                  <span className="text-primary text-5xl font-logo-first-en italic font-black leading-none transform group-hover:scale-105 transition-transform inline-block">S</span>
                  <span className="text-foreground text-2xl font-logo-rest-en font-extrabold leading-none uppercase tracking-[0.15em] ms-0.5">ouqi</span>
                  <span className="text-primary text-5xl leading-none font-black ms-0.5 group-hover:animate-bounce inline-block">.</span>
                </div>
              )}
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.aboutText', 'Your ultimate destination for premium quality products. We provide the best shopping experience with secure payments and fast delivery worldwide.')}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-6">{t('footer.pages', 'Quick Links')}</h3>
            <ul className="space-y-3.5 text-sm">
              {['home', 'about', 'faqs', 'contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'home' ? '/' : `/${item}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className={`w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors ${isAr ? 'ms-1' : 'me-1'}`}></span>
                    {t(`navbar.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Top Categories */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-6">{t('navbar.categories', 'Top Categories')}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-sm">
              {[
                { id: 'mens-clothing', en: 'Fashion', ar: 'الأزياء' },
                { id: 'electronics', en: 'Electronics', ar: 'الإلكترونيات' },
                { id: 'jewelry', en: 'Jewelry', ar: 'المجوهرات' },
                { id: 'shoes', en: 'Shoes', ar: 'الأحذية' },
                { id: 'home-and-kitchen', en: 'Home', ar: 'المنزل' },
                { id: 'beauty-and-cosmetics', en: 'Beauty', ar: 'الجمال' }
              ].map((cat) => (
                <Link key={cat.id} to={`/category/${cat.id}`} className="text-muted-foreground hover:text-primary transition-colors truncate">
                  {isAr ? cat.ar : cat.en}
                </Link>
              ))}
            </div>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-6">{t('footer.contactUs', 'Contact Us')}</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>{t('footer.address', 'Yemen - Sana’a, Al-Tahrir Street')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span dir="ltr">+967 777 423 769</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>support@souqi.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/60 bg-white dark:bg-zinc-950/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground max-w-7xl mx-auto">
            <p>
              {t('footer.copyright', 'Copyright © 2026 Souqi Store. All Rights Reserved.')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">{t('footer.privacy', 'Privacy Policy')}</a>
              <a href="#" className="hover:text-primary transition-colors">{t('footer.terms', 'Terms of Service')}</a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
