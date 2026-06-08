const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const replacements = [
  // In App.jsx
  { regex: /from "\.\/components\/Navbar"/g, replacement: 'from "./components/layout/Navbar"' },
  { regex: /from "\.\/components\/Footer"/g, replacement: 'from "./components/layout/Footer"' },
  { regex: /from "\.\/components\/ScrollManager"/g, replacement: 'from "./components/layout/ScrollManager"' },
  { regex: /from "\.\/pages\/Home"/g, replacement: 'from "./features/home/pages/Home"' },
  { regex: /from "\.\/pages\/AllProducts"/g, replacement: 'from "./features/products/pages/AllProducts"' },
  { regex: /from "\.\/pages\/ProductDetails"/g, replacement: 'from "./features/products/pages/ProductDetails"' },
  { regex: /from "\.\/pages\/ProductByCategory"/g, replacement: 'from "./features/products/pages/ProductByCategory"' },
  { regex: /from "\.\/pages\/SearchResultsPage"/g, replacement: 'from "./features/search/pages/SearchResultsPage"' },
  { regex: /from "\.\/pages\/AllCategories"/g, replacement: 'from "./features/categories/pages/AllCategories"' },
  { regex: /from "\.\/pages\/CartPage"/g, replacement: 'from "./features/cart/pages/CartPage"' },
  { regex: /from "\.\/features\/auth\/components\/LoginForm"/g, replacement: 'from "./features/auth/pages/LoginForm"' },
  { regex: /from "\.\/features\/auth\/components\/RegisterForm"/g, replacement: 'from "./features/auth/pages/RegisterForm"' },

  // In Navbar.jsx
  { regex: /from "\.\/Cart"/g, replacement: 'from "../../features/cart/components/Cart"' },
  { regex: /from "\.\.\/features\/products\/store"/g, replacement: 'from "../../features/products/store"' },
  { regex: /from "\.\.\/features\/cart\/store"/g, replacement: 'from "../../features/cart/store"' },
  { regex: /from "\.\.\/features\/auth\/store"/g, replacement: 'from "../../features/auth/store"' },

  // In Home.jsx
  { regex: /from '\.\.\/components\/HeroBaner'/g, replacement: "from '../components/HeroBaner'" },
  { regex: /from '\.\.\/components\/Delivery'/g, replacement: "from '../components/Delivery'" },
  { regex: /from '\.\.\/components\/BestSelling'/g, replacement: "from '../../products/components/BestSelling'" },
  { regex: /from '\.\.\/components\/TopCategories'/g, replacement: "from '../../categories/components/TopCategories'" },
  { regex: /from '\.\.\/components\/DiscountedProducts'/g, replacement: "from '../../products/components/DiscountedProducts'" },
  { regex: /from '\.\.\/components\/ForYouSection'/g, replacement: "from '../../products/components/ForYouSection'" },

  // In Products Pages
  { regex: /from "\.\.\/features\/products\/store"/g, replacement: 'from "../store"' },
  { regex: /from "\.\.\/features\/categories\/store"/g, replacement: 'from "../../categories/store"' },
  { regex: /from "\.\.\/components\/ProductCard"/g, replacement: 'from "../components/ProductCard"' },
  { regex: /from "\.\.\/components\/SlidbarFilter"/g, replacement: 'from "../components/SlidbarFilter"' },
  { regex: /from "\.\.\/components\/ProductCardSkeleton"/g, replacement: 'from "../components/ProductCardSkeleton"' },
  { regex: /from '\.\.\/features\/products\/store'/g, replacement: "from '../store'" },
  { regex: /from '\.\.\/features\/categories\/store'/g, replacement: "from '../../categories/store'" },
  { regex: /from '\.\.\/components\/ProductCard'/g, replacement: "from '../components/ProductCard'" },
  { regex: /from '\.\.\/components\/ProductCardSkeleton'/g, replacement: "from '../components/ProductCardSkeleton'" },
  { regex: /from "\.\.\/components\/BestSelling"/g, replacement: 'from "../components/BestSelling"' },
  { regex: /from "\.\.\/features\/cart\/store"/g, replacement: 'from "../../cart/store"' },

  // In Products Components
  { regex: /from "\.\/DiscountBadge"/g, replacement: 'from "../../../components/ui/DiscountBadge"' },
  { regex: /from '\.\/DiscountBadge'/g, replacement: "from '../../../components/ui/DiscountBadge'" },
  { regex: /from "\.\.\/index\.css"/g, replacement: 'from "../../../index.css"' },
  { regex: /from '\.\.\/index\.css'/g, replacement: "from '../../../index.css'" },
  { regex: /from '\.\.\/features\/products\/store'/g, replacement: "from '../store'" },
  { regex: /from "\.\.\/features\/products\/store"/g, replacement: 'from "../store"' },
  { regex: /from "\.\.\/features\/cart\/store"/g, replacement: 'from "../../cart/store"' },

  // In Categories Pages
  { regex: /from '\.\.\/features\/categories\/store'/g, replacement: "from '../store'" },
  { regex: /from '\.\.\/components\/CategoryCard'/g, replacement: "from '../components/CategoryCard'" },
  { regex: /from '\.\.\/components\/CategoryCardSkeleton'/g, replacement: "from '../components/CategoryCardSkeleton'" },

  // In Categories Components
  { regex: /from '\.\.\/features\/categories\/store'/g, replacement: "from '../store'" },

  // In Search Pages
  { regex: /from '\.\.\/features\/products\/store'/g, replacement: "from '../../products/store'" },
  { regex: /from '\.\.\/features\/categories\/store'/g, replacement: "from '../../categories/store'" },

  // Services
  { regex: /from '\.\.\/services\/productsData'/g, replacement: "from '../../products/services/productsData'" },
  { regex: /from '\.\.\/services\/categoriesData'/g, replacement: "from '../../categories/services/categoriesData'" },
];

const files = getAllFiles(srcDir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
