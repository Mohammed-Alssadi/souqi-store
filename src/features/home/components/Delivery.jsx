import { Clock3, Percent, ShieldCheck, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";

const Delivery = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Percent,
      title: t('delivery.discount', 'Discount'),
      desc: t('delivery.discountDesc', 'Every week new sales')
    },
    {
      icon: Truck,
      title: t('delivery.freeDelivery', 'Free Delivery'),
      desc: t('delivery.freeDeliveryDesc', '100% Free for all orders')
    },
    {
      icon: Clock3,
      title: t('delivery.support', 'Great Support 24/7'),
      desc: t('delivery.supportDesc', 'We care about your experiences')
    },
    {
      icon: ShieldCheck,
      title: t('delivery.securePayment', 'Secure Payment'),
      desc: t('delivery.securePaymentDesc', '100% Secure Payment Method')
    }
  ];

  return (
    <section className="my-20">
      {/* عنوان القسم */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          {t('delivery.sectionTitle', 'لماذا تتسوق معنا؟')}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto px-4">
          {t('delivery.sectionDesc', 'نحن نقدم أفضل الخدمات لضمان تجربة تسوق مريحة وآمنة لجميع عملائنا.')}
        </p>
      </div>

      {/* حاوية المميزات */}
      <div className="bg-card md:mx-auto md:shadow-sm p-6 md:p-10 rounded-none md:rounded-[24px] border-0 md:border-2 md:border-dashed md:border-border text-card-foreground">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center gap-4 group">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:-translate-y-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-lg md:text-xl text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Delivery;
