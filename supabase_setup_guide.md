# الدليل الشامل لربط مشروعك مع Supabase (باك إند وتسجيل الدخول)

اختيارك لـ **Supabase** هو خيار ممتاز جداً واحترافي. Supabase هو بديل قوي ومفتوح المصدر لـ Firebase، ويعتمد على قاعدة بيانات PostgreSQL الحقيقية، مما يجعله مثالياً لمتاجر التجارة الإلكترونية التي تتطلب علاقات معقدة بين الجداول (مثل طلبات المستخدمين، المنتجات، والفئات).

إليك الخطوات الكاملة والتفصيلية لربط مشروعك الحالي (React/Vite) مع Supabase:

---

## الخطوة 1: إنشاء مشروع على Supabase
1. اذهب إلى موقع [Supabase.com](https://supabase.com/) وقم بإنشاء حساب مجاني.
2. اضغط على **"New Project"** لإنشاء مشروع جديد.
3. اختر اسماً للمشروع (مثل `eCommerce-App`)، وكلمة مرور قوية لقاعدة البيانات، واختر أقرب منطقة جغرافية لخوادمك (مثلاً فرانكفورت أو البحرين إن توفرت).
4. انتظر بضع دقائق حتى يتم تجهيز قاعدة البيانات الخاصة بك.

## الخطوة 2: تثبيت حزمة Supabase في مشروعك
افتح الطرفية (Terminal) في مسار مشروعك وقم بتشغيل الأمر التالي لتثبيت مكتبة Supabase الخاصة بالجافاسكربت:
```bash
npm install @supabase/supabase-js
```

## الخطوة 3: إعداد متغيرات البيئة (Environment Variables)
لحماية مفاتيح الربط، سنضعها في ملف متغيرات البيئة.
1. أنشئ ملفاً جديداً في المجلد الجذري للمشروع (نفس مسار `package.json`) وقم بتسميته `.env.local` (أو `.env` فقط).
2. اذهب إلى لوحة تحكم Supabase الخاصة بمشروعك -> **Settings** -> **API**.
3. انسخ `Project URL` و `anon public key` والصقها في الملف كالتالي:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

## الخطوة 4: تهيئة عميل Supabase (Supabase Client)
أنشئ ملفاً جديداً في مشروعك، مثلاً `src/services/supabaseClient.js`، واكتب فيه الكود التالي لإنشاء الاتصال:
```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## الخطوة 5: بناء نظام تسجيل الدخول وإنشاء الحسابات (Auth)
يوفر Supabase نظام مصادقة جاهز وسهل جداً. يمكنك إنشاء صفحة تسجيل دخول (مثلاً `Login.jsx`) واستخدام الدوال التالية:

**إنشاء حساب جديد (Sign Up):**
```javascript
import { supabase } from '../services/supabaseClient';

const handleSignUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  
  if (error) console.error("Error signing up:", error.message);
  else console.log("User signed up:", data);
};
```

**تسجيل الدخول (Sign In):**
```javascript
const handleSignIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  
  if (error) console.error("Error logging in:", error.message);
  else console.log("Logged in successfully:", data);
};
```

**تسجيل الخروج (Sign Out):**
```javascript
const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error signing out:", error.message);
};
```

**مراقبة حالة المستخدم (هل هو مسجل دخول أم لا):**
في `App.jsx` أو `Navbar.jsx`، يمكنك مراقبة التغييرات في حالة المستخدم لتغيير واجهة المستخدم (مثل إظهار زر "حسابي" بدلاً من "تسجيل الدخول"):
```javascript
useEffect(() => {
  // جلب المستخدم الحالي عند تحميل الصفحة
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null);
  });

  // الاستماع لأي تغيير في حالة تسجيل الدخول/الخروج
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);
```

## الخطوة 6: تصميم قاعدة البيانات (Database)
من لوحة تحكم Supabase، اذهب إلى قسم **Table Editor** وأنشئ الجداول التالية:
1. **جدول `products`:** 
   - `id` (uuid أو int)
   - `title` (text)
   - `price` (numeric)
   - `description` (text)
   - `image_url` (text)
   - `category` (text)
2. **جدول `orders`:**
   - `id` (uuid)
   - `user_id` (uuid, مربوط بجدول المستخدمين `auth.users`)
   - `total_price` (numeric)
   - `status` (text)

*(ملاحظة: يمكنك إدخال البيانات يدوياً من واجهة Supabase أو رفع ملف CSV يحتوي على بيانات منتجاتك الحالية).*

## الخطوة 7: جلب المنتجات من قاعدة البيانات (بدلاً من البيانات الثابتة)
الآن بدلاً من استدعاء `productsData.js`، ستقوم بجلب البيانات الحية من Supabase. يمكنك إنشاء دالة لهذا الغرض:
```javascript
import { supabase } from '../services/supabaseClient';

export const fetchProductsFromSupabase = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
    
  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
  return data;
};
```
*(يمكنك دمج هذه الدالة مع `Redux Toolkit` باستخدام `createAsyncThunk` تماماً كما كان الحال مع الـ API القديم، ولكن هذه المرة ستجلب البيانات من Supabase).*

## الخطوة 8: حماية البيانات باستخدام RLS (Row Level Security)
أحد أهم ميزات Supabase هي الأمان. يجب عليك تفعيل الـ RLS على جداولك من لوحة التحكم:
- **جدول المنتجات (`products`):** اجعله متاحاً للقراءة للجميع (Public Read Access) بحيث يستطيع أي زائر تصفح المنتجات.
- **جدول الطلبات (`orders`):** اجعله مقيداً، بحيث لا يستطيع المستخدم رؤية أو إضافة طلبات إلا إذا كان مسجلاً للدخول، ولا يرى سوى طلباته الخاصة (حيث `user_id` يساوي `auth.uid()`).

---

### هل تريد أن نبدأ في التنفيذ؟
الخطوات السابقة تعطيك تصوراً كاملاً للعملية. إذا كنت مستعداً، يمكنني البدء في تنفيذ **الخطوات البرمجية** معك خطوة بخطوة في مشروعك الآن (مثل إنشاء ملفات المصادقة أو تعديل شريط التنقل ليدعم تسجيل الدخول). ماذا تفضل أن تفعل أولاً؟
