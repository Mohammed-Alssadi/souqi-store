import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store';
import { loginSchema } from '../schemas/authSchemas';

import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';

/**
 * 🧠 خطاف مخصص (Custom Hook) لإدارة منطق وحالة تسجيل الدخول بالكامل.
 * يقوم بفصل شروط التوجيه، التنبيهات، والاتصال بقاعدة البيانات عن المكون المرئي.
 */
export function useLogin() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // 🔌 جلب وظائف ومستمع الجلسة من Zustand Store
  const { signIn, user } = useAuthStore();

  // 🔹 الحالات الخاصة بعمليات التحقق والأخطاء وإعادة الإرسال
  const [authError, setAuthError] = useState('');
  const [unconfirmedEmail, setUnconfirmedEmail] = useState('');
  const [resending, setResending] = useState(false);

  // 🛡️ حماية المسار: توجيه المستخدم للرئيسية فوراً إذا كان مسجلاً للدخول بالفعل
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // 📝 تهيئة مكتبة React Hook Form مع ربطها بمخطط التحقق Zod
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  // 🚀 تنفيذ تسجيل الدخول عند إرسال النموذج بنجاح
  const onSubmit = async (data) => {
    setAuthError('');
    setUnconfirmedEmail('');
    try {
      // محاولة تسجيل الدخول عبر عميل Supabase Auth
      await signIn(data.email, data.password);
      toast.success(t('auth.loginSuccess', 'Successfully signed in!'));
      navigate('/');
    } catch (err) {
      const errMsg = err.message || '';
      console.error('Login error details:', err);

      setAuthError(errMsg);
      toast.error(errMsg);

      // التحقق تحديداً إذا كان الخطأ لعدم تأكيد البريد الإلكتروني لتفعيل زر إعادة الإرسال
      const isUnconfirmed = 
        errMsg.toLowerCase().includes('confirm') || 
        errMsg.toLowerCase().includes('not verified') || 
        err.code === 'email_not_confirmed';

      if (isUnconfirmed) {
        setUnconfirmedEmail(data.email);
      }
    }
  };

  // 🔄 دالة لإعادة إرسال رابط التفعيل في حال لم يستلمه المستخدم
  const handleResendLink = async () => {
    if (!unconfirmedEmail) return;
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: unconfirmedEmail,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      toast.success(t('auth.resendSuccess', 'Verification link has been successfully resent to your email!'));
      setUnconfirmedEmail('');
      setAuthError('');
    } catch (err) {
      toast.error(err.message || t('auth.resendError'));
    } finally {
      setResending(false);
    }
  };

  return {
    form,
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
  };
}
