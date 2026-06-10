import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="absolute top-full start-0 end-0 bg-background p-4 shadow-xl border-t border-border xl:hidden z-50 animate-in fade-in slide-in-from-top-2">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder={t('navbar.searchPlaceholder', 'Search...')}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 rounded-full px-5 py-2 bg-secondary border-border focus-visible:ring-primary transition-all duration-300"
          autoFocus
        />
        <Button
          type="submit"
          className="rounded-xl font-bold px-4"
        >
          {t('navbar.go', 'Go')}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </Button>
      </form>
    </div>
  );
}
