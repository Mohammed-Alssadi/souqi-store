import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../store';
import { toast } from 'sonner';

/**
 * 🧠 خطاف مخصص (Custom Hook) لإدارة حالة ومنطق صفحة تفعيل البريد الإلكتروني.
 * يتحكم بقراءة البريد من الرابط، وإعادة إرسال رمز التفعيل، وتوجيه الجلسات.
 */
export function useVerifyEmail() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  
  // 🔌 جلب حالة الجلسة الحالية
  const { user } = useAuthStore();
  const [resending, setResending] = useState(false);

  // 🛡️ حماية المسار: إذا كان الحساب مفعلاً والتحقق تم بنجاح، يتم تحويله للرئيسية
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // 🔄 دالة لإرسال بريد تفعيل جديد
  const handleResend = async () => {
    if (!email) {
      toast.error(
        i18n.language.startsWith('ar')
          ? 'لم نتمكن من العثور على البريد الإلكتروني.'
          : 'Email address not found.'
      );
      return;
    }

    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      toast.success(t('auth.resendSuccess', 'Verification link has been successfully resent to your email!'));
    } catch (error) {
      console.error('Resend error:', error);
      toast.error(t('auth.resendError', 'Failed to resend the link. Please try again later.'));
    } finally {
      setResending(false);
    }
  };

  const isRTL = i18n.language.startsWith('ar');

  return {
    email,
    resending,
    handleResend,
    isRTL,
    t,
  };
}
