import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import React from 'react'
import { Armchair } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t, i18n } = useTranslation()
  return (
    <footer id="footer" className="bg-primary shadow-md mt-6 text-primary-foreground">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4">
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-start">
            {t('footer.subscribe', 'Subscribe to Our Newsletter')}
          </h2>

          <div className="relative w-full sm:max-w-md mt-3">
            <input type="email" placeholder={t('footer.yourEmail', 'Your email')} className="w-full py-2 px-4 rounded-full border border-input focus:outline-none focus:border-ring bg-background text-foreground" />
            <button className="bg-accent text-accent-foreground hover:bg-accent/90 py-2 px-4 rounded-full absolute top-1/2 -translate-y-1/2 end-2 text-sm sm:text-base">
              {t('footer.subscribe', 'Subscribe')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-primary/90 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <Link
              to="/"
              className="text-xl md:text-3xl font-bold flex items-center gap-2 text-primary-foreground mb-3"
            >
              <Armchair size="2.5rem" className="text-primary-foreground" /> comforty
            </Link>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {t('footer.aboutText', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod veniam aliquid labore perferendis dolorem doloremque accusamus atque ex.')}
              </p>

              <div className="flex items-center gap-4 mt-4 justify-center sm:justify-start">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <Icon
                    key={i}
                    size={30}
                    className="bg-background text-foreground rounded-lg p-1.5 cursor-pointer hover:bg-muted transition"
                  />
                ))}
              </div>
            </div>

            {/* Pages */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">{t('footer.pages', 'Pages')}</h2>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <Link to="/" className="text-zinc-300 hover:text-white">{t('navbar.home', 'Home')}</Link>
                </li>
                <li>
                  <Link to="/" className="text-zinc-300 hover:text-white">{t('navbar.about', 'About')}</Link>
                </li>
                <li>
                  <Link to="/" className="text-zinc-300 hover:text-white">{t('navbar.faqs', 'FAQs')}</Link>
                </li>
                <li>
                  <Link to="/" className="text-zinc-300 hover:text-white">{t('navbar.contact', 'Contact')}</Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 ms-4">{t('navbar.categories', 'Categories')}</h2>
              <div className=" grid grid-cols-2 gap-2">
                <ul className="space-y-2 text-sm sm:text-base">
                  <li>
                    <Link to="/category/mens-clothing" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'ملابس' : 'Cloth'}</Link>
                  </li>
                  <li>
                    <Link to="/category/shoes" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'أحذية' : 'Shoes'}</Link>
                  </li>
                  <li>
                    <Link to="/category/jewelry" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'مجوهرات' : 'Jewelry'}</Link>
                  </li>
                  <li>
                    <Link to="/category/electronics" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'إلكترونيات' : 'Electronics'}</Link>
                  </li>
                     <li>
                    <Link to="/category/sports-and-outdoors" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'الرياضة والهواء الطلق' : 'Sports & Outdoors'}</Link>
                  </li>
                    <li>
                    <Link to="/category/toys-and-games" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'ألعاب الأطفال' : 'Toys & Games'}</Link>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li>
                    <Link to="/category/bags-and-accessories" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'حقائب وإكسسوارات' : 'Bags & Accessories'}</Link>
                  </li>
                  <li>
                    <Link to="/category/beauty-and-cosmetics" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'الجمال ومستحضرات التجميل' : 'Beauty & Cosmetics'}</Link>
                  </li>
                  <li>
                    <Link to="/category/books-and-stationery" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'الكتب والقرطاسية' : 'Books & Stationery'}</Link>
                  </li>
                  <li>
                    <Link to="/category/furniture" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'أثاث' : 'Furniture'}</Link>
                  </li>
                     <li>
                    <Link to="/category/home-and-kitchen" className="text-zinc-300 hover:text-white">{i18n.language.startsWith('ar') ? 'المنزل والمطبخ' : 'Home & Kitchen'}</Link>
                  </li>
                  
                </ul>
              </div>

            </div>

            {/* Contact */}
            <div className='lg:ms-10'>
              <h2 className="text-xl sm:text-2xl font-bold mb-3" >{t('footer.contactUs', 'Contact Us')}</h2>
              <ul className="space-y-1 text-sm sm:text-base text-zinc-300">
                <li>{t('footer.address', 'Yemen - Sana’a Al-Tahrir Street')}</li>
                <li dir="ltr" className={i18n.language.startsWith('ar') ? 'text-end' : 'text-start'}>+967 777 423 769</li>
                <li dir="ltr" className={i18n.language.startsWith('ar') ? 'text-end' : 'text-start'}>+967 733 577 780</li>
                <li>info@alssadi.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-primary/80 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-zinc-400 text-sm sm:text-base">
            {t('footer.copyright', 'Copyright © 2026 All Rights Reserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
