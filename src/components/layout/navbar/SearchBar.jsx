import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

export default function SearchBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState(location.state?.q || "");

  useEffect(() => {
    setSearchInput(location.state?.q || "");
  }, [location.state?.q]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") return;
    navigate(`/search`, { state: { q: searchInput.trim() } });
  };

  return (
    <div className="hidden lg:block flex-1 max-w-md mx-6">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder={t('navbar.searchHere', 'Search here...')}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full h-11 bg-gray-100 dark:bg-secondary/30 border border-gray-200 dark:border-transparent hover:bg-gray-200 dark:hover:bg-secondary/50 focus:bg-white dark:focus:bg-background focus:border-primary rounded-full ps-5 pe-12 focus:outline-none focus:ring-4 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute end-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Search size={18} />
        </button>
      </form>
    </div>
  );
}
