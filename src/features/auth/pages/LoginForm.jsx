import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store';
import { LogIn, AlertCircle } from 'lucide-react';

// 🛡️ استخدام Zod لتعريف مخطط التحقق من صحة البيانات (Validation Schema)
const loginSchema = z.object({
  email: z.string().min(1, 'emailRequired').email('invalidEmail'),
  password: z.string().min(6, 'passwordMin'),
});

function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // 🔌 جلب دالة تسجيل الدخول من Zustand (والتي تتصل بدورها بـ Supabase)
  const signIn = useAuthStore((state) => state.signIn);
  const [authError, setAuthError] = useState('');

  // 📝 تهيئة React Hook Form مع Zod Resolver لربط التحقق بالنموذج
  const {
    register, // تُستخدم لربط حقول الإدخال (Inputs) بالنموذج
    handleSubmit, // دالة للتعامل مع الإرسال (Submit) بعد التحقق من صحة البيانات
    formState: { errors, isSubmitting }, // جلب الأخطاء وحالة الإرسال (لمنع الإرسال المتكرر)
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // 🚀 دالة تُنفذ عند إرسال النموذج بنجاح (بعد اجتياز جميع شروط Zod)
  const onSubmit = async (data) => {
    setAuthError(''); // تصفير الأخطاء السابقة
    try {
      // 🔐 محاولة تسجيل الدخول عبر Supabase باستخدام البريد وكلمة المرور
      await signIn(data.email, data.password);
      // ↪️ التوجيه للصفحة الرئيسية بعد نجاح التسجيل
      navigate('/');
    } catch (err) {
      // ❌ في حال فشل تسجيل الدخول (مثلاً: كلمة مرور خاطئة)، نعرض رسالة خطأ
      setAuthError(err.message || 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <div className="-mx-4 sm:mx-0 min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-120px)] flex items-center justify-center bg-background sm:bg-background py-8 sm:py-6 px-0 sm:px-4">
      <div className="max-w-md w-full bg-card sm:rounded-3xl shadow-lg sm:shadow-2xl px-6 sm:p-8 border border-border/50 sm:border-2">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 text-primary mb-3 sm:mb-4">
            <LogIn size={28} className="sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t('auth.welcomeBack')}</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">{t('auth.signInToAccount')}</p>
        </div>

        {authError && (
          <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-r-md flex items-start gap-3 text-red-500">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">{t('auth.emailAddress')}</label>
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
            <label className="block text-sm font-semibold text-foreground mb-2">{t('auth.password')}</label>
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

          <div className="flex flex-row items-center justify-between pt-1 gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" />
              <span className="text-sm text-muted-foreground whitespace-nowrap">{t('auth.rememberMe')}</span>
            </label>
            <Link to="#" className="text-sm font-medium text-primary hover:text-primary/80 whitespace-nowrap">
              {t('auth.forgotPassword')}
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-4"
          >
            {isSubmitting ? t('auth.signingIn') : t('auth.signIn')}
          </button>
        </form>

        <p className="text-center mt-6 sm:mt-8 text-sm sm:text-base text-muted-foreground">
          {t('auth.dontHaveAccount')}{' '}
          <Link to="/register" className="font-bold text-primary hover:text-primary/80 transition-colors">
            {t('auth.signUpNow')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
