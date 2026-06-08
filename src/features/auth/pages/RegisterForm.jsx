import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store';
import { UserPlus, AlertCircle } from 'lucide-react';

// 🛡️ استخدام Zod لتعريف مخطط التحقق من صحة البيانات لنموذج التسجيل
// يتم التحقق من الاسم، البريد، طول كلمة المرور، وتطابق كلمتي المرور
const registerSchema = z.object({
  fullName: z.string().min(3, 'fullNameMin'),
  email: z.string().min(1, 'emailRequired').email('invalidEmail'),
  password: z.string().min(6, 'passwordMin'),
  confirmPassword: z.string().min(1, 'confirmPasswordRequired'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "passwordsDontMatch",
  path: ["confirmPassword"],
});

function RegisterForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // 🔌 جلب دالة إنشاء الحساب من Zustand
  const signUp = useAuthStore((state) => state.signUp);
  // حالة لعرض الأخطاء (مثل الإيميل مسجل مسبقاً)
  const [authError, setAuthError] = useState('');
  // حالة لعرض رسالة النجاح بعد التسجيل
  const [successMsg, setSuccessMsg] = useState('');

  // 📝 إعداد React Hook Form مع ربطه بـ Zod للتحقق المباشر
  const {
    register, // لربط الحقول
    handleSubmit, // لمعالجة الإرسال
    formState: { errors, isSubmitting }, // الحصول على الأخطاء وحالة التحميل
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // 🚀 دالة تُنفذ عند إرسال النموذج بنجاح (بعد اجتياز جميع شروط Zod)
  const onSubmit = async (data) => {
    setAuthError('');
    setSuccessMsg('');
    try {
      // 🔐 محاولة إنشاء الحساب في Supabase
      await signUp(data.email, data.password, data.fullName);
      // ✅ عرض رسالة نجاح للمستخدم
      setSuccessMsg('Account created successfully! You can now sign in.');
      // ⏳ الانتظار ثانيتين ثم توجيه المستخدم لصفحة تسجيل الدخول
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      // ❌ في حال حدوث خطأ من خادم Supabase، نعرض رسالة الخطأ
      setAuthError(err.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="-mx-4 sm:mx-0 min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-120px)] flex items-center justify-center bg-background sm:bg-background py-8 sm:py-6 px-0 sm:px-4">
      <div className="max-w-md w-full bg-card sm:rounded-3xl shadow-lg sm:shadow-2xl px-6 sm:p-8 border border-border/50 sm:border-2">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 text-primary mb-3 sm:mb-4">
            <UserPlus size={28} className="sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t('auth.createAccount')}</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">{t('auth.joinUs')}</p>
        </div>

        {authError && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border-l-4 border-red-500 rounded-r-md flex items-start gap-3 text-red-500">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-medium">{authError}</p>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/10 border-l-4 border-green-500 rounded-r-md flex items-start gap-3 text-green-600">
            <p className="text-xs sm:text-sm font-medium">{successMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">{t('auth.fullName')}</label>
            <input
              type="text"
              {...register('fullName')}
              className={`w-full px-4 py-3 rounded-xl border bg-transparent text-foreground ${
                errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-input focus:border-primary focus:ring-primary/20'
              } outline-none transition-all focus:ring-4`}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1 font-medium">{t(`auth.errors.${errors.fullName.message}`)}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">{t('auth.emailAddress')}</label>
            <input
              type="email"
              {...register('email')}
              className={`w-full px-4 py-3 rounded-xl border bg-transparent text-foreground ${
                errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-input focus:border-primary focus:ring-primary/20'
              } outline-none transition-all focus:ring-4`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 font-medium">{t(`auth.errors.${errors.email.message}`)}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">{t('auth.password')}</label>
            <input
              type="password"
              {...register('password')}
              className={`w-full px-4 py-3 rounded-xl border bg-transparent text-foreground ${
                errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-input focus:border-primary focus:ring-primary/20'
              } outline-none transition-all focus:ring-4`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 font-medium">{t(`auth.errors.${errors.password.message}`)}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">{t('auth.confirmPassword')}</label>
            <input
              type="password"
              {...register('confirmPassword')}
              className={`w-full px-4 py-3 rounded-xl border bg-transparent text-foreground ${
                errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-input focus:border-primary focus:ring-primary/20'
              } outline-none transition-all focus:ring-4`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 font-medium">{t(`auth.errors.${errors.confirmPassword.message}`)}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-4"
          >
            {isSubmitting ? t('auth.creatingAccount') : t('auth.signUp')}
          </button>
        </form>

        <p className="text-center mt-5 sm:mt-6 text-sm sm:text-base text-muted-foreground">
          {t('auth.alreadyHaveAccount')}{' '}
          <Link to="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
            {t('auth.signInInstead')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
