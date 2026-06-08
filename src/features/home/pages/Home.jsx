import React from 'react'
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

// import { useDispatch } from 'react-redux';
// import { setSelectedCategory } from '../features/products/productSlice';
function Home() {


  return (
    <div className='container mx-auto px-5'>
     <HeroBaner/>

       
        <div id="categories" className=" mt-8 pt-8 ">
       
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


  );
}

export default Home;