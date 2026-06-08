import React from "react";
import { Sheet, SheetContent } from "../../../components/ui/sheet";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

function SlidbarFilter({
  visible,
  setVisible,
  filters,
  setFilters,
  onApply,
  onReset,
  maxPrice,
  categories=[],
}) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');

  // تقييم العملاء
  const handleRatingClick = (value) =>
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === value ? null : value, // يمكن إلغاء الاختيار
    }));

  // الترتيب
  const handleSortChange = (e) =>
    setFilters((prev) => ({ ...prev, sort: e.target.value }));

  // السعر
  const handlePriceChange = (index, value) =>
    setFilters((prev) => {
      const updated = [...prev.price];
      updated[index] = Number(value);
      if (updated[0] > updated[1]) updated[index === 0 ? 1 : 0] = updated[index];
      return { ...prev, price: updated };
    });

  // التصنيف
  const handleCategoryChange = (e) =>
    setFilters((prev) => ({ ...prev, category: e.target.value }));

  return (
    <Sheet open={visible} onOpenChange={setVisible}>
      <SheetContent
        side="end"
        className="w-[430px] p-6 overflow-y-auto sm:max-w-md rounded-s-2xl shadow-xl bg-background dark:bg-card text-foreground"
      >
        <div dir={isAr ? "rtl" : "ltr"} className="h-full">
          <h2 className="text-3xl font-semibold text-foreground mb-8">{t('filter.title', 'Filter')}</h2>

      {/* تقييم العملاء */}
      <div className="mb-8">

        <p className="text-lg font-medium text-foreground mb-3">{t('filter.customerReview', 'Customer Review')}</p>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((num) => (
            <div
              key={num}
              onClick={() => handleRatingClick(num)}
              className={`flex justify-between items-center border rounded-lg p-2 cursor-pointer transition-all ${
                filters.rating === num
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-accent"
              }`}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${i < num ? "text-yellow-400" : "text-gray-300"}`}
                    fill={i < num ? "#facc15" : "none"}
                  />
                ))}
              </div>
              <input
                type="radio"
                name="rating"
                checked={filters.rating === num}
                readOnly
              />
            </div>
          ))}
        </div>
      </div>

      {/* الترتيب */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-foreground mb-2">
          {t('filter.sortBy', 'Sort by')}
        </label>
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="w-full border border-input rounded-lg p-2 text-foreground focus:ring-2 focus:ring-primary bg-background"
        >
          <option value="default">{t('filter.defaultSorting', 'Default Sorting')}</option>
          <option value="price_low_high">{t('filter.priceLowHigh', 'Price: Low to High')}</option>
          <option value="price_high_low">{t('filter.priceHighLow', 'Price: High to Low')}</option>
          <option value="rating_high_low">{t('filter.ratingHighLow', 'Rating: High to Low')}</option>
        </select>
      </div>

      {/* السعر */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-foreground mb-3">
          {t('filter.productPrice', 'Product Price')}
        </label>
        <div className="flex justify-between text-sm text-primary font-semibold mb-1">
          <span>${filters.price[0]}</span>
          <span>${filters.price[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={filters.price[0]}
          onChange={(e) => handlePriceChange(0, e.target.value)}
          className="w-full accent-primary mb-2"
        />
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={filters.price[1]}
          onChange={(e) => handlePriceChange(1, e.target.value)}
          className="w-full accent-primary"
        />
      </div>

      {/* التصنيف */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-foreground mb-2">{t('filter.category', 'Category')}</label>
        <select
          value={filters.category}
          onChange={handleCategoryChange}
          className="w-full border border-input rounded-lg p-2 text-foreground focus:ring-2 focus:ring-primary bg-background"
        >
          {categories.map((category) => (
            <option key={category.id || category._id} value={category.name_en}>
              {isAr ? category.name_ar : category.name_en}
            </option>
          ))}
        </select>
      </div>

      {/* أزرار التنفيذ */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onApply}
          className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition"
        >
          {t('filter.applyFilter', 'Apply Filter')}
        </button>
        <button
          onClick={onReset}
          className="flex-1 border border-border text-foreground py-2 rounded-lg hover:bg-accent transition"
        >
          {t('filter.reset', 'Reset')}
        </button>
        </div>
      </div>
      </SheetContent>
    </Sheet>
  );
}

export default SlidbarFilter;
