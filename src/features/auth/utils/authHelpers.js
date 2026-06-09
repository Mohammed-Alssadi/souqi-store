/**
 * 🌐 تقوم هذه الدالة بترجمة رسائل الخطأ المستلمة من Supabase (والتي تكون باللغة الإنجليزية افتراضياً)
 * بناءً على لغة واجهة المستخدم الحالية (عربي/إنجليزي) عبر تفعيل استدعاء t() الخاص بـ i18next.
 */
export const translateAuthError = (err, t) => {
  const errMsg = err?.message || '';
  const errCode = err?.code || '';

  // 1. البريد الإلكتروني غير مفعل
  if (
    errMsg.toLowerCase().includes('confirm') ||
    errMsg.toLowerCase().includes('not verified') ||
    errCode === 'email_not_confirmed'
  ) {
    return t('auth.errors.emailNotVerified', 'Your email is not verified yet. Please check your inbox or resend the verification link.');
  }

  // 2. بيانات الدخول غير صحيحة (Wrong credentials)
  if (
    errMsg.toLowerCase().includes('invalid login credentials') ||
    errMsg.toLowerCase().includes('invalid credentials')
  ) {
    return t('auth.errors.invalidCredentials', 'Invalid login credentials. Please check your email and password.');
  }

  // 3. البريد الإلكتروني مسجل مسبقاً
  if (
    errMsg.toLowerCase().includes('already exists') ||
    errMsg.toLowerCase().includes('already registered')
  ) {
    return t('auth.errors.userAlreadyExists', 'This email is already registered. Please use another email or sign in.');
  }

  // 4. انتهاء صلاحية رابط التحقق
  if (errMsg.toLowerCase().includes('expired')) {
    return t('auth.errors.linkExpired', 'The verification link has expired. Please request a new one.');
  }

  // 5. تجاوز حد إرسال الرسائل (Rate Limit)
  if (
    errMsg.toLowerCase().includes('rate limit') ||
    errMsg.toLowerCase().includes('rate_limit') ||
    errMsg.toLowerCase().includes('too many requests')
  ) {
    return t('auth.errors.rateLimitExceeded', 'Email rate limit exceeded. Please wait a moment before trying again.');
  }

  // 6. أي خطأ آخر - نعيد الرسالة الأصلية أو رسالة عامة
  return errMsg || t('auth.errors.genericError', 'Something went wrong. Please try again.');
};
