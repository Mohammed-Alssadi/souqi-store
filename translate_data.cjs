const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'features', 'products', 'services', 'productsData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Basic Arabic dictionary for common words in the products
const dict = {
  "Men's Classic Denim Jacket": "جاكيت جينز كلاسيكي للرجال",
  "Casual Cotton T-Shirt": "تيشيرت قطني كاجوال",
  "Slim Fit Jeans": "جينز بقصة ضيقة",
  "Women's Summer Dress": "فستان صيفي للنساء",
  "Men's Hoodie Classic Fit": "هودي رجالي كلاسيكي",
  "Elegant Silver Necklace": "قلادة فضية أنيقة",
  "Gold Hoop Earrings": "أقراط ذهبية دائرية",
  "Diamond Engagement Ring": "خاتم خطوبة ماسي",
  "Leather Bracelet Set": "مجموعة أساور جلدية",
  "Pearl Drop Earrings": "أقراط لؤلؤ متدلية",
  "Wireless Bluetooth Earbuds": "سماعات بلوتوث لاسلكية",
  "Smartphone X9 Pro": "هاتف ذكي X9 برو",
  "Smart Watch FitBand 2": "ساعة ذكية فيت باند 2",
  "Gaming Headset X5": "سماعة ألعاب X5",
  "Portable Bluetooth Speaker": "مكبر صوت بلوتوث محمول",
  "Running Sneakers Pro X1": "حذاء جري برو X1",
  "Women's Casual Sneakers": "حذاء كاجوال نسائي",
  "Leather Formal Shoes": "حذاء رسمي جلدي",
  "Sports Training Shoes": "حذاء تدريب رياضي",
  "Classic Canvas Sneakers": "حذاء قماش كلاسيكي"
};

// Regex to match title, description, about
content = content.replace(/title:\s*"([^"]+)"/g, (match, p1) => {
  const ar = dict[p1] || p1 + " (عربي)";
  return `title_en: "${p1}",\n    title_ar: "${ar}"`;
});

content = content.replace(/description:\s*"([^"]+)"/g, (match, p1) => {
  return `description_en: "${p1}",\n    description_ar: "${p1} (وصف عربي)"`;
});

content = content.replace(/about:\s*"([^"]+)"/g, (match, p1) => {
  return `about_en: "${p1}",\n    about_ar: "${p1} (نبذة بالعربي)"`;
});

fs.writeFileSync(filePath, content, 'utf8');

console.log("productsData.js has been translated successfully!");

// Now for ordersData.js
const ordersPath = path.join(__dirname, 'src', 'features', 'orders', 'services', 'ordersData.js');
let ordersContent = fs.readFileSync(ordersPath, 'utf8');

ordersContent = ordersContent.replace(/title:\s*"([^"]+)"/g, (match, p1) => {
  const ar = dict[p1] || p1 + " (عربي)";
  return `title_en: "${p1}", title_ar: "${ar}"`;
});
ordersContent = ordersContent.replace(/title:\s*'([^']+)'/g, (match, p1) => {
  const ar = dict[p1] || p1 + " (عربي)";
  return `title_en: '${p1}', title_ar: '${ar}'`;
});

fs.writeFileSync(ordersPath, ordersContent, 'utf8');
console.log("ordersData.js has been translated successfully!");
