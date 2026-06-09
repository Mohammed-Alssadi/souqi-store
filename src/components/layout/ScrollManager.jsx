import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // لو الرابط فيه #، انزل للمقطع المحدد
      try {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        // تجاهل الخطأ إذا كان الـ hash غير صالح كـ CSS Selector (مثل توكنات Supabase)
      }
    } else {
      // لو مافيش #، ارجع لأعلى الصفحة
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  return null;
}