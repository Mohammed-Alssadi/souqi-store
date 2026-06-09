import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store';
import { registerSchema } from '../schemas/authSchemas';

import { toast } from 'sonner';

/**
 * 🧠 خطاف مخصص (Custom Hook) لإدارة منطق وحالة إنشاء الحساب الجديد بالكامل.
 * يفصل التحقق من صحة المدخلات والتواصل مع خادم قاعدة البيانات وتوجيه المسارات.
 */
export function useRegister() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // 🔌 جلب وظائف إنشاء الحساب والتحقق من الجلسة من Zustand Store
  const { signUp, user } = useAuthStore();

  // 🔹 حالة تخزين أخطاء التسجيل المستلمة من الخادم
  const [authError, setAuthError] = useState('');

  // 🛡️ حماية المسار: توجيه المستخدم للرئيسية فوراً إذا كان مسجلاً للدخول بالفعل
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // 📝 تهيئة React Hook Form للتحقق من الحقول باستخدام Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // 🚀 تنفيذ إنشاء الحساب عند الضغط على زر التسجيل بنجاح
  const onSubmit = async (data) => {
    setAuthError('');
    try {
      // الاتصال بـ Supabase لإنشاء الحساب وحفظ الاسم الأول والأخير بالـ user_metadata
      const result = await signUp(data.email, data.password, data.firstName, data.lastName);
      
      // في حال كان خيار تفعيل البريد الإلكتروني معطلاً في لوحة تحكم Supabase
      if (result?.session) {
        toast.success(t('auth.loginSuccess', 'Successfully signed in!'));
        navigate('/');
      } else {
        // إذا كان التحقق من البريد الإلكتروني مطلوباً (الوضع الافتراضي)
        toast.success(t('auth.registerSuccess', 'Account created successfully! Please activate it via the email sent to you.'));
        // توجيه المستخدم لصفحة التحقق من البريد المخصصة مع تمرير بريده الإلكتروني
        navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err) {
      const errMsg = err.message || 'Failed to create account.';
      setAuthError(errMsg);
      toast.error(errMsg);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    authError,
    onSubmit,
    t,
  };
}
