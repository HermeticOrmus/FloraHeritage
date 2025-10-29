import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "@/components/SEO";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import {
  Clock,
  Ban,
  Cigarette,
  PawPrint,
  Flower2,
  Camera,
  Users,
  UserCheck,
  AlertTriangle,
  Lock,
  Search,
  DollarSign,
  Wind,
  UtensilsCrossed,
  Trash2,
  ClipboardList,
  CreditCard,
  RefreshCw
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Rules() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  const houseRules = [
    {
      number: 1,
      title: t('rules.checkIn'),
      description: t('rules.checkInDesc'),
      Icon: Clock,
      bgColor: "bg-casa-blue-light/30",
      iconColor: "text-casa-blue-deep dark:text-casa-blue-light"
    },
    {
      number: 2,
      title: t('rules.noParties'),
      description: t('rules.partiesDesc'),
      Icon: Ban,
      bgColor: "bg-red-500/20",
      iconColor: "text-red-600 dark:text-red-400"
    },
    {
      number: 3,
      title: t('rules.smoking'),
      description: t('rules.smokingDesc'),
      Icon: Cigarette,
      bgColor: "bg-stone-300/30",
      iconColor: "text-stone-700 dark:text-stone-300"
    },
    {
      number: 4,
      title: t('rules.smokingFines'),
      description: t('rules.smokingFinesDesc'),
      Icon: DollarSign,
      bgColor: "bg-red-500/20",
      iconColor: "text-red-600 dark:text-red-400"
    },
    {
      number: 5,
      title: t('rules.noPets'),
      description: t('rules.noPetsDesc'),
      Icon: PawPrint,
      bgColor: "bg-hydrangea-soft/30",
      iconColor: "text-hydrangea-deep dark:text-hydrangea-medium"
    },
    {
      number: 6,
      title: t('rules.plantCare'),
      description: t('rules.plantCareDesc'),
      Icon: Flower2,
      bgColor: "bg-hydrangea-medium/20",
      iconColor: "text-hydrangea-deep dark:text-hydrangea-soft"
    },
    {
      number: 7,
      title: t('rules.commercialPhoto'),
      description: t('rules.commercialPhotoDesc'),
      Icon: Camera,
      bgColor: "bg-casa-blue-medium/20",
      iconColor: "text-casa-blue-dark dark:text-casa-blue-light"
    },
    {
      number: 8,
      title: t('rules.parentalResp'),
      description: t('rules.parentalRespDesc'),
      Icon: Users,
      bgColor: "bg-mountain-sage/30",
      iconColor: "text-mountain-forest dark:text-mountain-sage"
    },
    {
      number: 9,
      title: t('rules.minAge'),
      description: t('rules.minAgeDesc'),
      Icon: UserCheck,
      bgColor: "bg-casa-blue-light/30",
      iconColor: "text-casa-blue-dark dark:text-casa-blue-medium"
    },
    {
      number: 10,
      title: t('rules.liability'),
      description: t('rules.liabilityDesc'),
      Icon: AlertTriangle,
      bgColor: "bg-amber-500/20",
      iconColor: "text-amber-600 dark:text-amber-400"
    },
    {
      number: 11,
      title: t('rules.security'),
      description: t('rules.securityDesc'),
      Icon: Lock,
      bgColor: "bg-stone-300/30",
      iconColor: "text-stone-700 dark:text-stone-300"
    },
    {
      number: 12,
      title: t('rules.lostItems'),
      description: t('rules.lostDesc'),
      Icon: Search,
      bgColor: "bg-mountain-sage/30",
      iconColor: "text-mountain-deep dark:text-mountain-sage"
    }
  ];

  const checkOutConditions = [
    {
      Icon: Wind,
      text: t('rules.hangTowels'),
      bgColor: "bg-casa-blue-light/20",
      iconColor: "text-casa-blue-deep"
    },
    {
      Icon: UtensilsCrossed,
      text: t('rules.washDishes'),
      bgColor: "bg-hydrangea-soft/20",
      iconColor: "text-hydrangea-deep"
    },
    {
      Icon: Trash2,
      text: t('rules.takeTrash'),
      bgColor: "bg-mountain-sage/20",
      iconColor: "text-mountain-forest"
    }
  ];

  useEffect(() => {
    gsap.defaults({
      duration: 1,
      ease: "power2.out"
    });

    if (heroRef.current) {
      gsap.from(heroRef.current.querySelector("h1"), {
        opacity: 0,
        y: 30,
        duration: 1.2
      });
      gsap.from(heroRef.current.querySelector("p"), {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3
      });
    }

    if (rulesRef.current) {
      const cards = rulesRef.current.querySelectorAll(".rule-card");
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: rulesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <SEO
        title={`${t('rules.title')} - Casa Del Puente`}
        description={t('rules.description')}
        keywords="casa del puente rules, vacation rental policies, boquete house rules, booking terms, cancellation policy"
      />

      <section
        ref={heroRef}
        className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-casa-blue-light/20 via-background to-hydrangea-soft/10"
      >
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-foreground">
            {t('rules.title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            {t('rules.description')}
          </p>
        </div>
      </section>

      <main className="relative">
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div ref={rulesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {houseRules.map((rule) => {
                const IconComponent = rule.Icon;
                return (
                  <GlassCard
                    key={rule.number}
                    className="rule-card p-6 hover-elevate"
                    data-testid={`rule-${rule.number}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 p-3 rounded-lg ${rule.bgColor} ${rule.iconColor}`}>
                        <IconComponent size={28} strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-semibold text-casa-blue-medium bg-casa-blue-light/20 px-2 py-1 rounded">
                            #{rule.number}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                          {rule.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-background to-casa-blue-light/5">
          <div className="max-w-4xl mx-auto px-6">
            <GlassCard className="p-8 md:p-12">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6 text-center">
                {t('rules.checkOutTitle')}
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                {t('rules.checkOutDesc')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {checkOutConditions.map((condition, index) => {
                  const IconComponent = condition.Icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-6 rounded-lg bg-glass-light/50 backdrop-blur-sm border border-white/10"
                      data-testid={`checkout-condition-${index}`}
                    >
                      <div className={`flex items-center justify-center mb-4 p-4 rounded-lg ${condition.bgColor}`}>
                        <IconComponent size={48} strokeWidth={2.5} className={condition.iconColor} />
                      </div>
                      <p className="text-foreground font-medium">{condition.text}</p>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                {t('rules.reservationTitle')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('rules.reservationDesc')}
              </p>
            </div>

            <div className="space-y-6">
              <GlassCard className="p-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-casa-blue-light/30 text-casa-blue-dark dark:text-casa-blue-light">
                    <ClipboardList size={28} strokeWidth={2} />
                  </div>
                  {t('rules.documentation')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('rules.documentationDesc')}
                </p>
              </GlassCard>

              <GlassCard className="p-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-mountain-sage/30 text-mountain-forest dark:text-mountain-sage">
                    <CreditCard size={28} strokeWidth={2} />
                  </div>
                  {t('rules.paymentSchedule')}
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-casa-blue-medium font-bold mt-1">•</span>
                    <span dangerouslySetInnerHTML={{ __html: t('rules.deposit50') }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-casa-blue-medium font-bold mt-1">•</span>
                    <span dangerouslySetInnerHTML={{ __html: t('rules.remaining50') }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-casa-blue-medium font-bold mt-1">•</span>
                    <span dangerouslySetInnerHTML={{ __html: t('rules.fullPayment') }} />
                  </li>
                </ul>
              </GlassCard>

              <GlassCard className="p-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-hydrangea-soft/30 text-hydrangea-deep dark:text-hydrangea-medium">
                    <RefreshCw size={28} strokeWidth={2} />
                  </div>
                  {t('rules.cancellationPolicy')}
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-mountain-forest font-bold mt-1">✓</span>
                    <span dangerouslySetInnerHTML={{ __html: t('rules.refund30') }} />
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-1">✗</span>
                    <span dangerouslySetInnerHTML={{ __html: t('rules.noRefund') }} />
                  </li>
                </ul>
              </GlassCard>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl font-serif text-foreground italic">
                {t('rules.thankYou')}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
