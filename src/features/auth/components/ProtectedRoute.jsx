import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store';

/**
 * 🛡️ غلاف حماية المسارات (Protected Route)
 * يستخدم لحماية الصفحات التي تتطلب تسجيل دخول مسبق (مثل الدفع، أو صفحة الحساب).
 * يقوم بتوجيه الزوار غير المسجلين إلى صفحة تسجيل الدخول مع حفظ المسار الذي حاولوا الوصول إليه.
 */
const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  // إذا لم يكن هناك مستخدم مسجل، قم بتوجيهه لصفحة الدخول وحفظ المسار الأصلي في state
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // إذا كان المستخدم مسجلاً، اعرض المكون (الصفحة) المطلوب
  return children;
};

export default ProtectedRoute;
