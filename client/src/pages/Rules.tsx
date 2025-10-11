import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/GlassCard";
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

const houseRules = [
  {
    number: 1,
    title: "Check-In and Check-Out Times",
    description: "Check-in time is at 3:00 PM and check-out time is at 11:00 AM.",
    Icon: Clock,
    bgColor: "bg-casa-blue-light/30",
    iconColor: "text-casa-blue-deep dark:text-casa-blue-light"
  },
  {
    number: 2,
    title: "No Parties Policy",
    description: "Parties of any kind are not allowed on the property.",
    Icon: Ban,
    bgColor: "bg-red-500/20",
    iconColor: "text-red-600 dark:text-red-400"
  },
  {
    number: 3,
    title: "No Smoking Policy",
    description: "Smoking is strictly prohibited inside the house.",
    Icon: Cigarette,
    bgColor: "bg-stone-300/30",
    iconColor: "text-stone-700 dark:text-stone-300"
  },
  {
    number: 4,
    title: "Pet Policy",
    description: "Pets are not allowed on the property.",
    Icon: PawPrint,
    bgColor: "bg-hydrangea-soft/30",
    iconColor: "text-hydrangea-deep dark:text-hydrangea-medium"
  },
  {
    number: 5,
    title: "Plant Care",
    description: "Cutting flowers and/or plants from the garden is prohibited.",
    Icon: Flower2,
    bgColor: "bg-hydrangea-medium/20",
    iconColor: "text-hydrangea-deep dark:text-hydrangea-soft"
  },
  {
    number: 6,
    title: "Commercial Photography",
    description: "Commercial photography is not authorized without prior consent.",
    Icon: Camera,
    bgColor: "bg-casa-blue-medium/20",
    iconColor: "text-casa-blue-dark dark:text-casa-blue-light"
  },
  {
    number: 7,
    title: "Parental Responsibility",
    description: "Parents or guardians are responsible for ensuring the safety of their children during the stay.",
    Icon: Users,
    bgColor: "bg-mountain-sage/30",
    iconColor: "text-mountain-forest dark:text-mountain-sage"
  },
  {
    number: 8,
    title: "Minimum Age to Book",
    description: "You must be at least 18 years old to make a reservation.",
    Icon: UserCheck,
    bgColor: "bg-casa-blue-light/30",
    iconColor: "text-casa-blue-dark dark:text-casa-blue-medium"
  },
  {
    number: 9,
    title: "Liability for Damages",
    description: "Any damage caused to the property will be the responsibility of the guest.",
    Icon: AlertTriangle,
    bgColor: "bg-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400"
  },
  {
    number: 10,
    title: "Security of Belongings",
    description: "Each guest is responsible for locking doors and windows to ensure the security of their belongings.",
    Icon: Lock,
    bgColor: "bg-stone-300/30",
    iconColor: "text-stone-700 dark:text-stone-300"
  },
  {
    number: 11,
    title: "Lost Items",
    description: "If any item is left on the property, please notify us as soon as possible.",
    Icon: Search,
    bgColor: "bg-mountain-sage/30",
    iconColor: "text-mountain-deep dark:text-mountain-sage"
  },
  {
    number: 12,
    title: "Smoking Fines",
    description: "If smoking is verified inside the house, a fine of $50.00 will be applied.",
    Icon: DollarSign,
    bgColor: "bg-red-500/20",
    iconColor: "text-red-600 dark:text-red-400"
  }
];

const checkOutConditions = [
  {
    Icon: Wind,
    text: "Hang towels in the bathrooms",
    bgColor: "bg-casa-blue-light/30",
    iconColor: "text-casa-blue-dark dark:text-casa-blue-light"
  },
  {
    Icon: UtensilsCrossed,
    text: "Wash used dishes",
    bgColor: "bg-hydrangea-soft/30",
    iconColor: "text-hydrangea-deep dark:text-hydrangea-medium"
  },
  {
    Icon: Trash2,
    text: "Take trash to the designated area",
    bgColor: "bg-mountain-sage/30",
    iconColor: "text-mountain-forest dark:text-mountain-sage"
  }
];

export default function Rules() {
  const heroRef = useRef<HTMLElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.defaults({
      duration: 1,
      ease: "power2.out"
    });

    // Hero fade in
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

    // Stagger animation for rule cards
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

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-casa-blue-light/20 via-background to-hydrangea-soft/10"
      >
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-foreground">
            House Rules
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            We appreciate your cooperation to ensure a pleasant stay for all our guests
          </p>
        </div>
      </section>

      <main className="relative">
        {/* House Rules Grid */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div ref={rulesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {houseRules.map((rule) => {
                const IconComponent = rule.Icon;
                return (
                  <GlassCard
                    key={rule.number}
                    className="rule-card p-6 hover-elevate"
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

        {/* Check-Out Conditions */}
        <section className="py-24 bg-gradient-to-br from-background to-casa-blue-light/5">
          <div className="max-w-4xl mx-auto px-6">
            <GlassCard className="p-8 md:p-12">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6 text-center">
                Check-Out Conditions
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                When leaving the property, we kindly request that you:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {checkOutConditions.map((condition, index) => {
                  const IconComponent = condition.Icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-6 rounded-lg bg-glass-light/50 backdrop-blur-sm border border-white/10"
                    >
                      <div className={`flex items-center justify-center mb-4 p-4 rounded-lg ${condition.bgColor} ${condition.iconColor}`}>
                        <IconComponent size={40} strokeWidth={2} />
                      </div>
                      <p className="text-foreground font-medium">{condition.text}</p>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Reservation Policy */}
        <section className="py-24 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                Reservation Policy
              </h2>
              <p className="text-muted-foreground text-lg">
                Please review our booking and cancellation terms
              </p>
            </div>

            <div className="space-y-6">
              {/* Required Documentation */}
              <GlassCard className="p-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-casa-blue-light/30 text-casa-blue-dark dark:text-casa-blue-light">
                    <ClipboardList size={28} strokeWidth={2} />
                  </div>
                  Required Documentation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To make a reservation, identification of the person booking is required along with a copy of their identity document and proof of address.
                </p>
              </GlassCard>

              {/* Payment Schedule */}
              <GlassCard className="p-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-mountain-sage/30 text-mountain-forest dark:text-mountain-sage">
                    <CreditCard size={28} strokeWidth={2} />
                  </div>
                  Payment Schedule
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-casa-blue-medium font-bold mt-1">•</span>
                    <span>A <strong className="text-foreground">50% deposit</strong> is required at the time of booking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-casa-blue-medium font-bold mt-1">•</span>
                    <span>The remaining <strong className="text-foreground">50%</strong> is due <strong className="text-foreground">one month</strong> before the initial reservation date</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-casa-blue-medium font-bold mt-1">•</span>
                    <span>If the reservation is made <strong className="text-foreground">less than one month</strong> before the stay begins, <strong className="text-foreground">100% payment</strong> is required at the time of booking</span>
                  </li>
                </ul>
              </GlassCard>

              {/* Cancellation Policy */}
              <GlassCard className="p-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-hydrangea-soft/30 text-hydrangea-deep dark:text-hydrangea-medium">
                    <RefreshCw size={28} strokeWidth={2} />
                  </div>
                  Cancellation Policy
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-mountain-forest font-bold mt-1">✓</span>
                    <span><strong className="text-foreground">30% refund</strong> if cancelled one month or more before the stay begins</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-1">✗</span>
                    <span><strong className="text-foreground">No refund</strong> if cancellation occurs less than one month before the stay begins</span>
                  </li>
                </ul>
              </GlassCard>
            </div>

            {/* Thank You Message */}
            <div className="mt-12 text-center">
              <p className="text-xl font-serif text-foreground italic">
                We appreciate your cooperation and hope you enjoy your stay.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
