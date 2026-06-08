import { create } from 'zustand';
import { supabase } from '../../lib/supabase';

// 🧠 إنشاء حالة عالمية (Global State) لإدارة بيانات المصادقة (Authentication) باستخدام Zustand
export const useAuthStore = create((set) => ({
  // 🔹 حالة تخزين بيانات المستخدم الحالي (إذا كان مسجلاً للدخول)
  user: null,
  // 🔹 حالة تخزين جلسة المستخدم (Session) التي تحتوي على توكنات الوصول (Access Tokens)
  session: null,
  // 🔹 حالة تحميل (Loading) للإشارة إلى ما إذا كانت جاري معالجة طلب حالياً
  loading: true,

  // 🔄 دوال لتحديث الحالة يدوياً عند الحاجة
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),

  // 🔐 دالة تسجيل الدخول (Sign In)
  // تقوم بالاتصال بخدمة Supabase للتحقق من البريد الإلكتروني وكلمة المرور
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error; // إيقاف العملية وإرجاع الخطأ إن وجد
    // تحديث الحالة ببيانات المستخدم والجلسة الجديدة
    set({ user: data.user, session: data.session });
    return data;
  },

  // 📝 دالة إنشاء حساب جديد (Sign Up)
  // ترسل بيانات المستخدم الجديد إلى Supabase
  signUp: async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // تخزين الاسم الكامل كبيانات إضافية للمستخدم (Metadata)
        }
      }
    });
    if (error) throw error; // إرجاع الخطأ إذا فشلت عملية التسجيل
    return data;
  },

  // 🚪 دالة تسجيل الخروج (Sign Out)
  // تقوم بإنهاء الجلسة من الخادم (Supabase) وتفريغ بيانات المستخدم من الحالة (State)
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, session: null }); // تصفير الحالة
  }
}));

