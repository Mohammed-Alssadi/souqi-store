import * as z from 'zod';

// 🛡️ تعبير نمطي للتحقق من أن الاسم يحتوي على حروف فقط (عربي وإنجليزي) بدون رموز أو أرقام
export const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;

// 🛡️ مخطط التحقق من صحة بيانات تسجيل الدخول (Login Validation Schema)
export const loginSchema = z.object({
  email: z.string().min(1, 'emailRequired').email('invalidEmail'),
  password: z.string().min(6, 'passwordMin'),
});

// 🛡️ مخطط التحقق من صحة بيانات إنشاء الحساب الجديد (Registration Validation Schema)
export const registerSchema = z.object({
  firstName: z.string().min(2, 'firstNameMin').regex(nameRegex, 'nameLettersOnly'),
  lastName: z.string().min(2, 'lastNameMin').regex(nameRegex, 'nameLettersOnly'),
  email: z.string().min(1, 'emailRequired').email('invalidEmail'),
  password: z.string().min(6, 'passwordMin'),
  confirmPassword: z.string().min(1, 'confirmPasswordRequired'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "passwordsDontMatch",
  path: ["confirmPassword"],
});
