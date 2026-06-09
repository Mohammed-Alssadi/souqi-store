import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, AlertCircle, RefreshCw } from 'lucide-react';
import { useRegister } from '../hooks/useRegister';
import GoogleAuthButton from '../components/GoogleAuthButton';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * 🎨 مكون إنشاء حساب جديد المرئي (RegisterForm View Component)
 * يقتصر فقط على تقديم واجهة المستخدم وربط الحقول بالخطاف المستقل.
 */
function RegisterForm() {
  // 🧠 استهلاك خطاف التسجيل المستقل للحصول على الحالات والدوال
  const {
    form,
    isSubmitting,
    authError,
    onSubmit,
    t,
  } = useRegister();

  return (
    <div className="min-h-[calc(100dvh-80px)] flex items-center justify-center p-0 md:p-4 bg-background">
      <div className="max-w-md sm:max-w-lg w-full bg-card min-h-[calc(100dvh-80px)] md:min-h-0 rounded-none md:rounded-3xl md:shadow-xl px-5 sm:px-8 py-8 md:p-10 border-0 md:border-2 md:border-border/50 flex flex-col justify-center">
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
          <Alert variant="destructive" className="mb-4 sm:mb-6 flex items-start gap-3">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <AlertDescription className="text-xs sm:text-sm font-medium">{authError}</AlertDescription>
          </Alert>
        )}

        {/* نموذج الإدخال */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-5">
            {/* حقول الاسم الأول واسم العائلة في سطر واحد */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.firstName', 'الاسم الأول')}</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder={t('auth.firstNamePlaceholder', 'أحمد')} {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.firstName?.message ? t(`auth.errors.${form.formState.errors.firstName.message}`, t('auth.errors.firstNameMin', 'الاسم الأول مطلوب')) : ""}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.lastName', 'اسم العائلة')}</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder={t('auth.lastNamePlaceholder', 'محمد')} {...field} />
                      </FormControl>
                      <FormMessage>{form.formState.errors.lastName?.message ? t(`auth.errors.${form.formState.errors.lastName.message}`, t('auth.errors.lastNameMin', 'اسم العائلة مطلوب')) : ""}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* حقل البريد الإلكتروني */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.emailAddress')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.email?.message ? t(`auth.errors.${form.formState.errors.email.message}`) : ""}</FormMessage>
                </FormItem>
              )}
            />

            {/* حقل كلمة المرور */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.password')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.password?.message ? t(`auth.errors.${form.formState.errors.password.message}`) : ""}</FormMessage>
                </FormItem>
              )}
            />

            {/* حقل تأكيد كلمة المرور */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.confirmPassword')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.confirmPassword?.message ? t(`auth.errors.${form.formState.errors.confirmPassword.message}`) : ""}</FormMessage>
                </FormItem>
              )}
            />

            {/* زر التقديم */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg mt-4"
            >
              {isSubmitting && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? t('auth.creatingAccount') : t('auth.signUp')}
            </Button>
          </form>
        </Form>

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
