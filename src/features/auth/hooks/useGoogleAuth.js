import { useState } from 'react';
import { useAuthStore } from '../store';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

/**
 * 🧠 خطاف مخصص (Custom Hook) للتعامل مع منطق الدخول باستخدام حساب Google.
 */
export function useGoogleAuth() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signInWithGoogle } = useAuthStore();
  const { t } = useTranslation();

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      await signInWithGoogle();
      // ملاحظة: سيقوم Supabase بإعادة توجيه المتصفح تلقائياً إلى شاشة موافقة Google،
      // لذا قد لا تنفذ الأكواد التي تأتي بعد هذه الدالة في نفس الجلسة.
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(error.message || t('auth.googleLoginError', 'حدث خطأ أثناء الاتصال بجوجل. يرجى المحاولة لاحقاً.'));
      setIsGoogleLoading(false);
    }
  };

  return {
    handleGoogleLogin,
    isGoogleLoading,
  };
}
