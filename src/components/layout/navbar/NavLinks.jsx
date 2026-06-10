import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NavLinks() {
  const { t } = useTranslation();

  const links = [
    { name: t('navbar.home'), path: "" },
    { name: t('navbar.categories'), path: "categories" },
    { name: t('navbar.products'), path: "products" },
  ];

  return (
    <nav className="hidden xl:flex gap-6">
      {links.map((link, index) => (
        <Link key={index} to={`/${link.path}`} className="text-foreground font-medium hover:text-primary transition-colors">
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
