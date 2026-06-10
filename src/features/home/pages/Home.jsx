import React from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../../products/components/ProductCard';
import DiscountedProducts from '../../products/components/DiscountedProducts';
import Footer from '../../../components/layout/Footer';
import CategoryCard from '../../categories/components/CategoryCard';
import BestSelling from '../../products/components/BestSelling';
import HeroBaner from '../components/HeroBaner';
import ForYouSection from '../../products/components/ForYouSection';
import Delivery from '../components/Delivery';
import TopCategories from '../../categories/components/TopCategories';
import Cart from '../../cart/components/Cart';
import SEO from '../../../components/common/SEO';

// import { useDispatch } from 'react-redux';
// import { setSelectedCategory } from '../features/products/productSlice';
function Home() {
  const { t } = useTranslation();

  return (
    <>
      <SEO 
        title={t('home.title', 'Home')}
        description={t('home.desc', 'Discover the best products and exclusive offers at Souqi. Shop now!')}
        url="/"
      />
      <div className='w-full px-2 sm:px-4 md:container md:mx-auto md:px-5'>
       <HeroBaner/>

       
        <div id="categories" className="mt-5 pt-5 md:mt-10 md:pt-10">
       
         <TopCategories />
        </div>
        {/* <div className='flex gap-4 itmes-center justify-center flex-wrap' >
  {categories.map((item,index) => 
  
  <button key={index}
  onClick={()=>dispatch(setSelectedCategory(item))}
   className='bg-secondary py-2 px-6 rounded-md text-secondary-foreground active:scale-105 hover:bg-secondary/80 transition-all ease-in '>{item}</button> )}
</div> */}
        <section id="products">
          
          <ForYouSection />
          <DiscountedProducts/>
          <BestSelling />
          <Delivery/>
        </section>
       
      </div>
    </>
  );
}

export default Home;