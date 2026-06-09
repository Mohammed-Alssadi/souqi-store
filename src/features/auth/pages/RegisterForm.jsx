import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useRegister } from '../hooks/useRegister';
import GoogleAuthButton from '../components/GoogleAuthButton';

/**
 * 🎨 مكون إنشاء حساب جديد المرئي (RegisterForm View Component)
 * يقتصر فقط على تقديم واجهة المستخدم وربط الحقول بالخطاف المستقل.
 */
function RegisterForm() {
  // 🧠 استهلاك خطاف التسجيل المستقل للحصول على الحالات والدوال
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    authError,
    onSubmit,
    t,
  } = useRegister();

  return (
    <div className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-120px)] flex items-center justify-center bg-background md:py-12 md:px-4">
      <div className="max-w-md w-full bg-card min-h-[calc(100vh-80px)] md:min-h-0 rounded-none md:rounded-3xl md:shadow-xl px-5 py-8 md:p-8 border-0 md:border-2 md:border-border/50 flex flex-col justify-center">
        {/* ترويسة الصفحة */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 text-primary mb-3 sm:mb-4">
            <UserPlus size={24} className="sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t('auth.createAccount')}</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">{t('auth.joinUs')}</p>
        </div>

        {/* زر جوجل */}
        <GoogleAuthButton actionText={t('auth.signUpWithGoogle', 'إنشاء الحساب باستخدام Google')} />

        {/* فاصل تسجيل الدخول الاجتماعي */}
        <div className="relative mt-5 mb-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              {t('auth.orContinueWith', 'أو المتابعة باستخدام')}
            </span>
          </div>
        </div>

        {/* عرض رسائل أخطاء التسجيل */}
        {authError && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border-l-4 border-red-500 rounded-r-md flex items-start gap-3 text-red-500">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-medium">{authError}</p>
          </div>
        )}

        {/* نموذج الإدخال */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          {/* حقول الاسم الأول واسم العائلة في سطر واحد */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-1">{t('auth.firstName', 'الاسم الأول')}</label>
              <input
                type="text"
                {...register('firstName')}
                className={`w-full px-4 py-3 rounded-xl border bg-transparent text-foreground ${
                  errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-input focus:border-primary focus:ring-primary/20'
                } outline-none transition-all focus:ring-4`}
                placeholder={t('auth.firstNamePlaceholder', 'أحمد')}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1 font-medium">{t(`auth.errors.firstNameMin`, 'الاسم الأول مطلوب')}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-1">{t('auth.lastName', 'اسم العائلة')}</label>
              <input
                type="text"
                {...register('lastName')}
                className={`w-full px-4 py-3 rounded-xl border bg-transparent text-foreground ${
                  errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-input focus:border-primary focus:ring-primary/20'
                } outline-none transition-all focus:ring-4`}
                placeholder={t('auth.lastNamePlaceholder', 'محمد')}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1 font-medium">{t(`auth.errors.lastNameMin`, 'اسم العائلة مطلوب')}</p>}
            </div>
          </div>

          {/* حقل البريد الإلكتروني */}
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

          {/* حقل كلمة المرور */}
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

          {/* حقل تأكيد كلمة المرور */}
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

          {/* زر التقديم */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-4"
          >
            {isSubmitting ? t('auth.creatingAccount') : t('auth.signUp')}
          </button>
        </form>

        {/* الانتقال لتسجيل الدخول */}
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
