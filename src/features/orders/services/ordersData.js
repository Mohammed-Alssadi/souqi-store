const orders = [
  {
    id: 1001,
    customer: 'Guest',
    status: 'pending', // pending | paid | shipped | cancelled
    total: 84.99,
    createdAt: '2025-01-01T10:00:00Z',
    items: [
      { productId: 1, title_en: "Men's Classic Denim Jacket", title_ar: "جاكيت جينز كلاسيكي للرجال", price: 39.99, qty: 1 },
      { productId: 2, title_en: 'Casual Cotton T-Shirt', title_ar: 'تيشيرت قطني كاجوال', price: 15.0, qty: 3 },
    ],
    notes: ''
  },
  {
    id: 1002,
    customer: 'Guest',
    status: 'paid',
    total: 69.0,
    createdAt: '2025-01-03T14:30:00Z',
    items: [
      { productId: 11, title_en: 'Wireless Bluetooth Earbuds', title_ar: 'سماعات بلوتوث لاسلكية', price: 69.0, qty: 1 },
    ],
    notes: ''
  }
]

export default orders
