import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

// التحقق من وجود المتغيرات لتجنب الأخطاء
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ مفاتيح Supabase مفقودة! الرجاء التأكد من إضافتها في ملف .env");
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
