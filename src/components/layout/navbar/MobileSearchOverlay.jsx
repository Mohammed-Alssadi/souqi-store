import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

export default function MobileSearchOverlay({ isOpen, setIsOpen }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSearchInput(location.state?.q || "");
    }
  }, [isOpen, location.state?.q]);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") return;
    navigate(`/search`, { state: { q: searchInput.trim() } });
    setIsOpen(false);
  };

  return (
    <div className="absolute top-full start-0 end-0 bg-background p-4 shadow-xl border-t border-border lg:hidden z-50 animate-in fade-in slide-in-from-top-2">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder={t('navbar.searchPlaceholder', 'Search...')}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 border border-border rounded-full px-5 py-2 focus:outline-none bg-accent/40 dark:bg-white/5 focus:bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 transition-all duration-300"
          autoFocus
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 rounded-xl hover:bg-primary/90 font-bold"
        >
          {t('navbar.go', 'Go')}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>
      </form>
    </div>
  );
}
