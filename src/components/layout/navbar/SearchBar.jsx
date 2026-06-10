import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="hidden xl:block flex-1 max-w-md mx-6">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder={t('navbar.searchHere', 'Search here...')}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full h-11 bg-secondary hover:bg-secondary/80 rounded-full ps-5 pe-12 transition-colors border-transparent focus-visible:ring-primary focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute end-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Search size={18} />
        </Button>
      </form>
    </div>
  );
}
