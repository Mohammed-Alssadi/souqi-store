import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, AlertCircle, RefreshCw } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * 🎨 مكون تسجيل الدخول المرئي (LoginForm View Component)
 * يقتصر فقط على تقديم واجهة المستخدم وربط الحقول بالخطاف المستقل.
 */
function LoginForm() {
  // 🧠 استهلاك خطاف تسجيل الدخول المستقل للحصول على الحالات والدوال
  const {
    form,
    isSubmitting,
    authError,
    unconfirmedEmail,
    resending,
    onSubmit,
    handleResendLink,
    t,
  } = useLogin();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-0 md:p-4 bg-background">
      <div className="max-w-md sm:max-w-lg w-full bg-card min-h-[calc(100vh-80px)] md:min-h-0 rounded-none md:rounded-3xl md:shadow-xl px-5 sm:px-8 py-8 md:p-10 border-0 md:border-2 md:border-border/50 flex flex-col justify-center">
        {/* ترويسة الصفحة */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 text-primary mb-3 sm:mb-4">
            <LogIn size={24} className="sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{t('auth.welcomeBack')}</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">{t('auth.signInToAccount')}</p>
        </div>

        {/* زر جوجل */}
        <GoogleAuthButton actionText={t('auth.signInWithGoogle', 'تسجيل الدخول باستخدام Google')} />

        {/* فاصل تسجيل الدخول الاجتماعي */}
        <div className="relative mt-6 mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              {t('auth.orContinueWith', 'أو المتابعة باستخدام')}
            </span>
          </div>
        </div>

        {/* عرض رسائل الخطأ والتنبيهات المخصصة */}
        {authError && (
          <Alert variant="destructive" className="mb-6 flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <AlertDescription className="text-sm font-medium">{authError}</AlertDescription>
            </div>

            {/* زر إعادة إرسال الرابط في حال عدم التفعيل */}
            {unconfirmedEmail && (
              <Button
                variant="link"
                type="button"
                onClick={handleResendLink}
                disabled={resending}
                className="mt-1 h-auto p-0 text-xs font-bold self-start"
              >
                {resending && <RefreshCw size={12} className="animate-spin mr-1.5" />}
                {t('auth.resendEmail', 'Resend Activation Link')}
              </Button>
            )}
          </Alert>
        )}

        {/* نموذج الإدخال */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 sm:gap-6">
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

            {/* خيارات إضافية */}
            <div className="flex flex-row items-center justify-between pt-1 gap-2">
              <div className="flex items-center gap-2 cursor-pointer">
                <Checkbox id="remember-me" />
                <label
                  htmlFor="remember-me"
                  className="text-sm text-muted-foreground whitespace-nowrap leading-none cursor-pointer"
                >
                  {t('auth.rememberMe')}
                </label>
              </div>
              <Button variant="link" className="text-sm font-medium px-0" asChild>
                <Link to="#">{t('auth.forgotPassword')}</Link>
              </Button>
            </div>

            {/* زر التقديم */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg mt-4"
            >
              {isSubmitting && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? t('auth.signingIn') : t('auth.signIn')}
            </Button>
          </form>
        </Form>

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
