import { Clock3, Percent, ShieldCheck, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";

const Delivery = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-card mx-auto shadow-sm p-6 rounded-[20px] my-20 border-dashed border-2 border-border text-card-foreground">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-8 text-center md:text-start items-center">
        
        {/* Discount */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
          <Percent className="bg-primary/10 p-3 text-primary rounded-lg" size={57} />
          <div className="text-start">
            <h3 className="font-bold text-lg md:text-xl text-foreground">{t('delivery.discount', 'Discount')}</h3>
            <p className="text-muted-foreground text-sm md:text-base">{t('delivery.discountDesc', 'Every week new sales')}</p>
          </div>
        </div>

        {/* Free Delivery */}
        <div className="flex items-center gap-4">
          <Truck className="bg-primary/10 p-3 text-primary rounded-lg" size={57} />
          <div className="text-start">
            <h3 className="font-bold text-lg md:text-xl text-foreground">{t('delivery.freeDelivery', 'Free Delivery')}</h3>
            <p className="text-muted-foreground text-sm md:text-base">{t('delivery.freeDeliveryDesc', '100% Free for all orders')}</p>
          </div>
        </div>

        {/* Great Support */}
        <div className="flex items-center gap-4">
          <Clock3 className="bg-primary/10 p-3 text-primary rounded-lg" size={57} />
          <div className="text-start">
            <h3 className="font-bold text-lg md:text-xl text-foreground">{t('delivery.support', 'Great Support 24/7')}</h3>
            <p className="text-muted-foreground text-sm md:text-base">{t('delivery.supportDesc', 'We care about your experiences')}</p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="flex items-center gap-4">
          <ShieldCheck className="bg-primary/10 p-3 text-primary rounded-lg" size={57} />
          <div className="text-start">
            <h3 className="font-bold text-lg md:text-xl text-foreground">{t('delivery.securePayment', 'Secure Payment')}</h3>
            <p className="text-muted-foreground text-sm md:text-base">{t('delivery.securePaymentDesc', '100% Secure Payment Method')}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Delivery;
