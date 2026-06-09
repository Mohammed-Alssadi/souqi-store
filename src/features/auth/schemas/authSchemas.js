import * as z from 'zod';

// 🛡️ تعبير نمطي للتحقق من أن الاسم يحتوي على حروف فقط (عربي وإنجليزي) بدون رموز أو أرقام
export const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;

// 🛡️ مخطط التحقق من صحة بيانات تسجيل الدخول (Login Validation Schema)
export const loginSchema = z.object({
  email: z.string({ required_error: 'emailRequired', invalid_type_error: 'invalidEmail' }).min(1, 'emailRequired').email('invalidEmail'),
  password: z.string({ required_error: 'passwordMin', invalid_type_error: 'passwordMin' }).min(6, 'passwordMin'),
});

// 🛡️ مخطط التحقق من صحة بيانات إنشاء الحساب الجديد (Registration Validation Schema)
export const registerSchema = z.object({
  firstName: z.string({ required_error: 'firstNameMin', invalid_type_error: 'firstNameMin' }).min(2, 'firstNameMin').regex(nameRegex, 'nameLettersOnly'),
  lastName: z.string({ required_error: 'lastNameMin', invalid_type_error: 'lastNameMin' }).min(2, 'lastNameMin').regex(nameRegex, 'nameLettersOnly'),
  email: z.string({ required_error: 'emailRequired', invalid_type_error: 'invalidEmail' }).min(1, 'emailRequired').email('invalidEmail'),
  password: z.string({ required_error: 'passwordMin', invalid_type_error: 'passwordMin' }).min(6, 'passwordMin'),
  confirmPassword: z.string({ required_error: 'confirmPasswordRequired', invalid_type_error: 'confirmPasswordRequired' }).min(1, 'confirmPasswordRequired'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "passwordsDontMatch",
  path: ["confirmPassword"],
});
