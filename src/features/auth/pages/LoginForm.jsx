import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, AlertCircle, RefreshCw } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';

/**
 * 🎨 مكون تسجيل الدخول المرئي (LoginForm View Component)
 * يقتصر فقط على تقديم واجهة المستخدم وربط الحقول بالخطاف المستقل.
 */
function LoginForm() {
  // 🧠 استهلاك خطاف تسجيل الدخول المستقل للحصول على الحالات والدوال
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    authError,
    unconfirmedEmail,
    resending,
    onSubmit,
    handleResendLink,
    t,
  } = useLogin();

  return (
    <div className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-120px)] flex items-center justify-center bg-background md:py-12 md:px-4">
      <div className="max-w-md w-full bg-card min-h-[calc(100vh-80px)] md:min-h-0 rounded-none md:rounded-3xl md:shadow-xl px-5 py-8 md:p-8 border-0 md:border-2 md:border-border/50 flex flex-col justify-center">
        {/* ترويسة الصفحة */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 text-primary mb-3 sm:mb-4">
            <LogIn size={24} className="sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t('auth.welcomeBack')}</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">{t('auth.signInToAccount')}</p>
        </div>

        {/* عرض رسائل الخطأ والتنبيهات المخصصة */}
        {authError && (
          <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-r-md flex flex-col gap-2 text-red-500">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{authError}</p>
            </div>
            
            {/* زر إعادة إرسال الرابط في حال عدم التفعيل */}
            {unconfirmedEmail && (
              <button
                type="button"
                onClick={handleResendLink}
                disabled={resending}
                className="mt-2 text-xs font-bold text-primary hover:underline flex items-center gap-1.5 self-start disabled:opacity-50"
              >
                {resending && <RefreshCw size={12} className="animate-spin" />}
                {t('auth.resendEmail', 'Resend Activation Link')}
              </button>
            )}
          </div>
        )}

        {/* نموذج الإدخال */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
          {/* حقل البريد الإلكتروني */}
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

          {/* حقل كلمة المرور */}
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

          {/* خيارات إضافية */}
          <div className="flex flex-row items-center justify-between pt-1 gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary border-input bg-background" />
              <span className="text-sm text-muted-foreground whitespace-nowrap">{t('auth.rememberMe')}</span>
            </label>
            <Link to="#" className="text-sm font-medium text-primary hover:text-primary/80 whitespace-nowrap">
              {t('auth.forgotPassword')}
            </Link>
          </div>

          {/* زر التقديم */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-4"
          >
            {isSubmitting ? t('auth.signingIn') : t('auth.signIn')}
          </button>
        </form>

        {/* الانتقال لإنشاء حساب */}
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
