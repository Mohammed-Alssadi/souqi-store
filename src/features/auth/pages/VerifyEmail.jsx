import React from 'react';
import { Link } from 'react-router-dom';
import { MailOpen, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import { useVerifyEmail } from '../hooks/useVerifyEmail';

/**
 * 🎨 مكون تفعيل البريد المرئي (VerifyEmail View Component)
 * يقتصر فقط على تقديم واجهة المستخدم وربط العناصر بالخطاف المستقل.
 */
function VerifyEmail() {
  // 🧠 استهلاك خطاف التحقق المستقل للحصول على الحالات والدوال
  const {
    email,
    resending,
    handleResend,
    isRTL,
    t,
  } = useVerifyEmail();

  return (
    <div className="min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-120px)] flex items-center justify-center bg-background md:py-12 md:px-4">
      <div className="max-w-md w-full bg-card min-h-[calc(100vh-80px)] md:min-h-0 rounded-none md:rounded-3xl md:shadow-xl px-5 py-8 md:p-8 border-0 md:border-2 md:border-border/50 flex flex-col justify-center items-center text-center">
        {/* أيقونة تفاعلية مميزة */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 text-primary">
            <MailOpen size={36} className="sm:w-10 sm:h-10 animate-bounce" />
          </div>
        </div>

        {/* عنوان الصفحة */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          {t('auth.verificationSentTitle', 'Account Verification Required')}
        </h2>

        {/* الرسالة التوضيحية */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
          {t('auth.verificationSentDesc', 'We have sent a verification link to your email: {{email}}. Please check your inbox (and spam folder) and click the link to activate your account.').replace('{{email}}', email || 'your email')}
        </p>

        {/* زر إعادة الإرسال */}
        <button
          onClick={handleResend}
          disabled={resending}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mb-4"
        >
          {resending ? (
            <>
              <RefreshCw className="animate-spin" size={18} />
              {t('auth.resending', 'Resending...')}
            </>
          ) : (
            <>
              {t('auth.resendEmail', 'Resend Email')}
            </>
          )}
        </button>

        {/* رابط الرجوع لتسجيل الدخول */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mt-2"
        >
          {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          {t('auth.backToLogin', 'Back to Login')}
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmail;
