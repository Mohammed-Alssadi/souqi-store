import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

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
        className="w-[85vw] sm:w-[430px] p-6 sm:max-w-md rounded-s-2xl shadow-xl bg-background dark:bg-card text-foreground flex flex-col"
      >
        <div dir={isAr ? "rtl" : "ltr"} className="flex flex-col h-full overflow-hidden">
          <h2 className="text-3xl font-semibold text-foreground mb-8 shrink-0">{t('filter.title', 'Filter')}</h2>

          <div className="flex-1 overflow-y-auto pe-2 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-secondary/50">

      {/* تقييم العملاء */}
      <div className="mb-8">

        <p className="text-lg font-medium text-foreground mb-3">{t('filter.customerReview', 'Customer Review')}</p>
        <RadioGroup value={filters.rating ? String(filters.rating) : ""} onValueChange={(val) => handleRatingClick(Number(val))}>
          <div className="flex flex-col gap-2">
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
                <RadioGroupItem value={String(num)} id={`rating-${num}`} onClick={(e) => e.stopPropagation()} />
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* الترتيب */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-foreground mb-2">
          {t('filter.sortBy', 'Sort by')}
        </label>
        <Select value={filters.sort} onValueChange={(value) => setFilters(prev => ({...prev, sort: value}))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('filter.defaultSorting', 'Default Sorting')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">{t('filter.defaultSorting', 'Default Sorting')}</SelectItem>
            <SelectItem value="price_low_high">{t('filter.priceLowHigh', 'Price: Low to High')}</SelectItem>
            <SelectItem value="price_high_low">{t('filter.priceHighLow', 'Price: High to Low')}</SelectItem>
            <SelectItem value="rating_high_low">{t('filter.ratingHighLow', 'Rating: High to Low')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* السعر */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-foreground mb-3">
          {t('filter.productPrice', 'Product Price')}
        </label>
        <div className="flex justify-between text-sm text-primary font-semibold mb-4">
          <span>${filters.price[0]}</span>
          <span>${filters.price[1]}</span>
        </div>
        <Slider
          defaultValue={[filters.price[0], filters.price[1]]}
          value={[filters.price[0], filters.price[1]]}
          max={maxPrice}
          step={1}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, price: value }))}
          className="w-full"
        />
      </div>

      {/* التصنيف */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-foreground mb-2">{t('filter.category', 'Category')}</label>
        <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({...prev, category: value}))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('filter.category', 'Category')} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id || category._id} value={category.name_en}>
                {isAr ? category.name_ar : category.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      </div>

      {/* أزرار التنفيذ */}
      <div className="flex justify-between gap-4 mt-auto shrink-0 pt-6 pb-2 border-t border-border">
        <Button
          onClick={onApply}
          className="flex-1"
        >
          {t('filter.applyFilter', 'Apply Filter')}
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1"
        >
          {t('filter.reset', 'Reset')}
        </Button>
        </div>
      </div>
      </SheetContent>
    </Sheet>
  );
}

export default SlidbarFilter;
