import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

function CategoryCard({category}) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  if (!category) {
    return null; // أو <div>جار التحميل...</div>
  }
const handleCategoryClick = () => {
 
  // التنقل إلى صفحة الصنف
  navigate(`/category/${category.slug}`);
};
  return (
  
<div className="">
    <Link to={`/category/${category.slug}`}>
    <div className="bg-card text-card-foreground  rounded-xl  transition-all duration-300 flex flex-col items-center group cursor-pointer md:w-[180px] overflow-hidden">
      <div className="w-full bg-white dark:bg-white flex items-center justify-center p-3">
        <img
           src={category.image}
          alt={i18n.language.startsWith('ar') ? category.name_ar : category.name_en}
          className="mx-auto w-55 h-24 md:h-28 object-contain transition-all duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-3 w-full text-center  border-border/50">
        <p className="text-foreground font-medium text-sm truncate">{i18n.language.startsWith('ar') ? category.name_ar : category.name_en}</p>
      </div>
    </div>
    </Link>
</div>
  )
}

export default CategoryCard